package com.web.webcuration.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.web.webcuration.Entity.Comment;
import com.web.webcuration.Entity.Contents;
import com.web.webcuration.Entity.Likes;
import com.web.webcuration.Entity.Post;
import com.web.webcuration.Entity.Scrap;
import com.web.webcuration.Entity.Tag;
import com.web.webcuration.Entity.User;
import com.web.webcuration.dto.MainFeedDto;
import com.web.webcuration.dto.UserPostInfo;
import com.web.webcuration.dto.UserRelationInfo;
import com.web.webcuration.dto.request.FeedRequest;
import com.web.webcuration.dto.request.LikeRequest;
import com.web.webcuration.dto.request.PostRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.CommentResponse;
import com.web.webcuration.dto.response.MainFeedResponse;
import com.web.webcuration.dto.response.PostResponse;
import com.web.webcuration.dto.response.ScrapResponse;
import com.web.webcuration.dto.response.UserPostResponse;
import com.web.webcuration.dto.response.UserRelationListResponse;
import com.web.webcuration.repository.PostQueryRepository;
import com.web.webcuration.repository.PostRepository;
import com.web.webcuration.utils.FileUtils;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

    private final TagService tagService;
    private final LikeService likeService;
    private final CommentService commentService;
    private final ChildCommentService childCommentService;
    private final ScrapService scrapService;
    private final UserService userService;
    private final RelationService relationService;
    private final ContentsService contentService;
    private final PostRepository postRepository;
    private final PostQueryRepository postQueryRepository;

    // 유저의 모든 게시글 출력
    @Override
    public BaseResponse readUserPosts(Long loginUserid, Long selectUserid) {
        User selectUser = userService.getUserInfo(selectUserid);
        List<Post> posts = postQueryRepository.FindByUserPostOrderby(selectUserid);
        List<UserPostInfo> userPostResponse = new ArrayList<>();
        for (Post post : posts) {
            // 썸네일 사진을 어떻게 전해 주는가?..
            userPostResponse.add(UserPostInfo.builder().post(post)
                    .image(contentService.FindByPostidOrderby(post.getId()).getImage()).build());
        }
        UserRelationInfo relationInfo = relationService.getCountUserRelation(loginUserid, selectUserid);
        UserPostResponse postResponse = UserPostResponse.builder().user(selectUser).postInfo(userPostResponse)
                .relationInfo(relationInfo).build();
        return BaseResponse.builder().status("200").msg("success").data(postResponse).build();
    }

    // 특정 게시글 출력
    @Override
    // 로그인 한 사람 userid, 게시글 postid
    public BaseResponse getSelectedPost(Long userid, Long postid) {
        Optional<Post> post = postRepository.findById(postid);
        if (post.isPresent()) {
            // 해당 게시글의 유저 정보
            User user = userService.getUserInfo(post.get().getUserid());
            List<Contents> contents = contentService.findAllByPostidOrderBy(postid);
            List<Tag> tags = tagService.findPostInTag(postid);
            boolean like = likeService.readLike(LikeRequest.builder().userid(userid).objectid(postid).build());
            // comment도 같이 줘야됨
            List<CommentResponse> comments = commentService.getPostComment(postid);
            // Scrap 유무
            boolean scrap = scrapService.checkScrapPost(userid, postid);
            return BaseResponse.builder().status("200").msg("success")
                    .data(PostResponse.builder().userid(user.getId()).userName(user.getNickname())
                            .userImage(user.getImage()).contents(contents).tags(tags).post(post.get()).like(like)
                            .scrap(scrap).comments(comments).build())
                    .build();
        } else {
            throw new RuntimeException("해당하는 게시글이 없습니다.");
        }
    }

    @Override
    @Transactional
    public BaseResponse createPost(PostRequest newPost) throws IllegalStateException, IOException {
        Long postid = postRepository.save(newPost.toPost(userService.getUserInfo(newPost.getEmail()).getId())).getId();
        if (newPost.getContents() != null) {
            contentService.saveAllContents(FileUtils.uploadFile(newPost.getContents(), postid));
        }
        if (newPost.getTags() != null) {
            tagService.saveTag(newPost.getTags(), postid);
        }
        return BaseResponse.builder().status("200").status("success").build();
    }

    @Override
    @Transactional
    public BaseResponse deletePost(Long postid) {
        tagService.deleteTag(postid);

        List<Contents> reqContents = contentService.findAllByPostidOrderBy(postid);
        FileUtils.deleteFile(reqContents);
        contentService.deleteAllContents(reqContents);

        postRepository.deleteById(postid);

        List<Long> commentids = commentService.findCommentidByPostid(postid);
        Long cnt = childCommentService.deleteChildCommentByCommentids(commentids);
        changePostCommentCnt(postid, -cnt);
        return BaseResponse.builder().status("200").status("success").build();
    }

    @Override
    @Transactional
    public BaseResponse updatePost(PostRequest changePost) throws IllegalStateException, IOException {
        Optional<Post> optPost = postRepository.findById(changePost.getPostid());
        if (optPost.isPresent()) {
            Post post = postRepository.save(changePost.toPost(optPost.get()));
            User user = userService.getUserInfo(post.getUserid());
            // contents
            List<Contents> reqContents = contentService.findAllByPostidOrderBy(post.getId());
            FileUtils.deleteFile(reqContents);
            List<Contents> contents = contentService
                    .saveAllContents(FileUtils.uploadFile(changePost.getContents(), post.getId()));
            // 태그
            tagService.deleteTag(post.getId());
            List<Tag> tags = changePost.getTags() != null ? tagService.saveTag(changePost.getTags(), post.getId())
                    : null;
            // like
            boolean like = likeService
                    .readLike(LikeRequest.builder().userid(user.getId()).objectid(changePost.getPostid()).build());
            return BaseResponse
                    .builder().status("200").status("success").data(PostResponse.builder().userName(user.getNickname())
                            .userImage(user.getImage()).contents(contents).tags(tags).post(post).like(like).build())
                    .build();
        }
        throw new RuntimeException("수정하려는 게시글이 없습니다.");
    }

    @Override
    public BaseResponse getExplorePost(FeedRequest feedRequest) {
        List<Long> block = relationService.getUserRelation(feedRequest.getUserid()).getBlock();
        List<Post> explorePosts = postQueryRepository.getExplorePost(block, feedRequest.getPostid());
        List<UserPostInfo> userPostResponse = new ArrayList<>();
        if (explorePosts != null) {
            for (Post post : explorePosts) {
                userPostResponse.add(UserPostInfo.builder().post(post)
                        .image(contentService.FindByPostidOrderby(post.getId()).getImage()).build());
            }
        }
        return BaseResponse.builder().status("200").msg("success").data(userPostResponse).build();
    }

    @Override
    public MainFeedResponse getMainFeed(FeedRequest feedRequest) {
        List<Long> follow = relationService.getUserRelation(feedRequest.getUserid()).getFollow();
        List<Post> posts = postQueryRepository.getMainFeed(follow, feedRequest.getPostid());
        log.info("{}",
                "follow : " + follow + " post : " + postQueryRepository.findAllByUserid(feedRequest.getUserid()));
        if (follow.size() == 1 && postQueryRepository.findAllByUserid(feedRequest.getUserid()).size() == 0L) {
            List<Long> block = relationService.getRelationListByUserid("Block", feedRequest.getUserid());
            List<UserRelationListResponse> randomUsers = userService.getRandomUserInfo(block, feedRequest.getUserid());
            return MainFeedResponse.builder().type(false).randomUsers(randomUsers).build();
        } else {
            List<MainFeedDto> mainFeedDtos = new ArrayList<>();
            if (posts != null) {
                for (Post post : posts) {
                    User user = userService.getUserInfo(post.getUserid());
                    List<Contents> contents = contentService.findAllByPostidOrderBy(post.getId());
                    boolean like = likeService
                            .readLike(LikeRequest.builder().userid(post.getUserid()).objectid(post.getId()).build());
                    boolean scrap = scrapService.checkScrapPost(user.getId(), post.getId());
                    mainFeedDtos.add(MainFeedDto.builder().userid(user.getId()).nickname(user.getNickname())
                            .image(user.getImage()).post(post).contents(contents).like(like).scrap(scrap).build());
                }
            }
            return MainFeedResponse.builder().type(true).mainFeedDto(mainFeedDtos).build();
        }
    }

    @Override
    public BaseResponse changePostCommentCnt(Long postid, Long number) {
        Optional<Post> previousPost = postRepository.findById(postid);
        if (previousPost.isPresent()) {
            Post post = previousPost.get();
            Long changeCommentCnt = post.getComCnt() + number;
            post.setComCnt(changeCommentCnt);
            postRepository.save(post);
            return BaseResponse.builder().status("200").msg("success").data(changeCommentCnt).build();
        } else {
            throw new RuntimeException("해당 게시글이 없습니다.");
        }
    }

    @Override
    public BaseResponse changePostLikeCnt(Long postid, Long number) {
        Optional<Post> previousPost = postRepository.findById(postid);
        if (previousPost.isPresent()) {
            Post post = previousPost.get();
            Long changeLikeCnt = post.getLikeCnt() + number;
            post.setLikeCnt(changeLikeCnt);
            postRepository.save(post);
            return BaseResponse.builder().status("200").msg("success").data(changeLikeCnt).build();
        } else {
            throw new RuntimeException("해당 게시글이 없습니다.");
        }
    }

    @Override
    @Transactional
    public List<Long> deleteByUserid(Long userid) {
        List<Post> deletePost = postRepository.findAllByUserid(userid);
        List<Long> postids = new ArrayList<>();
        if (deletePost != null) {
            for (Post post : deletePost) {
                deletePost(post.getId());
                likeService.deleteLikeByPostid(post.getId());
                postids.add(post.getId());
            }
        }
        List<Likes> deleteByUserid = likeService.deleteLikeByUserid(userid);
        if (deleteByUserid != null) {
            for (Likes like : deleteByUserid) {
                changePostLikeCnt(like.getPostid(), -1L);
            }
        }
        List<Comment> comments = commentService.findCommentByUserid(userid);
        for (Comment comment : comments) {
            Long postid = commentService.getCommentPostid(comment.getId());
            commentService.deleteComment(comment.getId());
            Long cnt = childCommentService.getChildCommentByCommentid(comment.getId());
            changePostCommentCnt(postid, -(cnt + 1L));
        }
        return postids;
    }

    @Override
    public List<UserPostInfo> getRankPosts(List<Long> block) {
        List<Post> posts = postQueryRepository.getRankPost(block);
        if (posts == null) {
            return new ArrayList<>();
        } else {
            List<UserPostInfo> rankPostInfo = new ArrayList<>();
            for (Post post : posts) {
                rankPostInfo.add(UserPostInfo.builder().post(post)
                        .image(contentService.FindByPostidOrderby(post.getId()).getImage()).build());
            }
            return rankPostInfo;
        }
    }

    @Override
    public BaseResponse getScrapPost(List<Scrap> scraps) {
        List<ScrapResponse> scrapResponses = new ArrayList<>();
        for (Scrap scrap : scraps) {
            Optional<Post> post = postRepository.findById(scrap.getPostid());
            if (post.isPresent()) {
                scrapResponses.add(ScrapResponse.builder().scrapid(scrap.getId()).post(post.get())
                        .image(contentService.FindByPostidOrderby(post.get().getId()).getImage()).build());
            } else {
                throw new RuntimeException("해당 게시글이 없습니다.");
            }
        }
        return BaseResponse.builder().status("200").msg("success").data(scrapResponses).build();
    }

    @Override
    public Long getPostCountByUserid(Long userid) {
        return postQueryRepository.getPostCountByUserid(userid);
    }

    @Override
    public List<UserPostInfo> getAllPostByPostid(List<Long> block, List<Long> postids) {
        List<Post> AllPost = postQueryRepository.getAllPostByPostids(block, postids);
        List<UserPostInfo> userPostResponse = new ArrayList<>();
        if (AllPost != null) {
            for (Post post : AllPost) {
                userPostResponse.add(UserPostInfo.builder().post(post)
                        .image(contentService.FindByPostidOrderby(post.getId()).getImage()).build());
            }
        }
        return userPostResponse;
    }
}