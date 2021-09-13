package com.web.webcuration.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.web.webcuration.Entity.Contents;
import com.web.webcuration.dto.ContentDto;

import org.springframework.web.multipart.MultipartFile;

public class FileUtils {

    public static List<Contents> uploadFile(List<ContentDto> reqContents, Long postid)
            throws IllegalStateException, IOException {
        List<Contents> resContents = new ArrayList<>();
        String basePath = SetFilePath();
        Integer index = 1;
        for (ContentDto content : reqContents) {
            UUID uuid = UUID.randomUUID();
            String filePath = basePath + "/" + uuid.toString() + getContentType(content.getMedia());
            resContents.add(content.toContents(postid, filePath.replace(basePath, "/profileImg"), index++));
            File dest = new File(filePath);
            content.getMedia().transferTo(dest);
        }
        return resContents;
    }

    public static void deleteFile(List<Contents> reqContents) {
        for (Contents content : reqContents) {
            String filepath = content.getImage();
            File file = new File(filepath);
            if (file.exists()) {
                file.delete();
            }
        }
    }

    public static String uploadProfile(MultipartFile profileImage) throws IllegalStateException, IOException {
        UUID uuid = UUID.randomUUID();
        String basePath = SetFilePath();
        String filePath = basePath + "/" + uuid.toString() + getContentType(profileImage);
        File dest = new File(filePath);
        profileImage.transferTo(dest);

        return filePath.replace(basePath, "/profileImg");
    }

    public static void deleteProfile(String profileFilePath) {
        File file = new File(profileFilePath);
        if (file.exists()) {
            file.delete();
        }
    }

    public static String getContentType(MultipartFile file) {
        String contentType = file.getContentType();
        String originalFileExtension;
        if (contentType.equals("image/jpeg")) {
            originalFileExtension = ".jpg";
        } else if (contentType.equals("image/png")) {
            originalFileExtension = ".png";
        } else if (contentType.equals("image/gif")) {
            originalFileExtension = ".gif";
        } else if (contentType.equals("video/mp4")) {
            originalFileExtension = ".mp4";
        } else {
            throw new RuntimeException("동영상이나 이미지가 아닙니다.");
        }
        return originalFileExtension;
    }

    public static String SetFilePath() {
        // local환경
        // String basePath =
        // FileSystemView.getFileSystemView().getHomeDirectory().toString() + "/img";
        // 서버 환경
        String basePath = "/home/img";
        return basePath;
    }
}
