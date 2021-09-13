package com.web.webcuration.service;

import java.io.IOException;
import java.util.List;

import com.web.webcuration.Entity.Scrap;
import com.web.webcuration.dto.UserPostInfo;
import com.web.webcuration.dto.request.FeedRequest;
import com.web.webcuration.dto.request.PostRequest;
import com.web.webcuration.dto.response.BaseResponse;
import com.web.webcuration.dto.response.MainFeedResponse;

public interface PostService {

    BaseResponse readUserPosts(Long loginUserid, Long selectUserid);

    BaseResponse getSelectedPost(Long userid, Long postid);

    BaseResponse createPost(PostRequest newPost) throws IllegalStateException, IOException;

    BaseResponse deletePost(Long postid);

    BaseResponse updatePost(PostRequest changePost) throws IllegalStateException, IOException;

    BaseResponse getExplorePost(FeedRequest feedRequest);

    MainFeedResponse getMainFeed(FeedRequest feedRequest);

    BaseResponse changePostCommentCnt(Long postid, Long number);

    BaseResponse changePostLikeCnt(Long postid, Long number);

    List<Long> deleteByUserid(Long userid);

    List<UserPostInfo> getRankPosts(List<Long> block);

    BaseResponse getScrapPost(List<Scrap> scraps);

    Long getPostCountByUserid(Long userid);

    List<UserPostInfo> getAllPostByPostid(List<Long> block, List<Long> postids);

}
