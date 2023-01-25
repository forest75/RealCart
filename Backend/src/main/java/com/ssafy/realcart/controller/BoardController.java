package com.ssafy.realcart.controller;

import com.ssafy.realcart.data.dto.BoardDto;
import com.ssafy.realcart.data.dto.CommentDto;
import com.ssafy.realcart.data.dto.RecordDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @GetMapping(value="/free")
    public ResponseEntity<List<BoardDto>> getFreeBoard(){
        List<BoardDto> list = new ArrayList<BoardDto>();
        BoardDto boardDto = new BoardDto();
        boardDto.setId(1);
        boardDto.setNickname("의권 짱짱");
        boardDto.setContent("제곧내");
        boardDto.setCreatedTime("2023-01-18 15:06:54.288323");
        boardDto.setModifiedTime("2023-01-19 15:06:54.288323");
        boardDto.setTitle("내가 제일 잘나가");
        List<CommentDto> commentList = new ArrayList<CommentDto>();
        CommentDto commentDto = new CommentDto();
        commentDto.setContent("ㅋㅋㅋ");
        commentDto.setCreatedTime("2023-01-18 17:06:54.288323");
        commentDto.setModifiedTime("");
        commentDto.setNickname("성민zㅣ존");
        commentDto.setId(1);
        commentList.add(commentDto);
        boardDto.setComments(commentList);
        list.add(boardDto);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping(value="/notice")
    public ResponseEntity<List<BoardDto>> getNoticeBoard(){
        List<BoardDto> list = new ArrayList<BoardDto>();
        BoardDto boardDto = new BoardDto();
        boardDto.setId(1);
        boardDto.setNickname("관리자");
        boardDto.setContent("랭킹 1위 의권 짱짱과 함께하는 경기 이벤트!");
        boardDto.setCreatedTime("2023-01-18 15:06:54.288323");
        boardDto.setModifiedTime("2023-01-19 15:06:54.288323");
        boardDto.setTitle("2023년 신년 이벤트");
        list.add(boardDto);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping(value="/report")
    public ResponseEntity<List<BoardDto>> getReportBoard(){
        List<BoardDto> list = new ArrayList<BoardDto>();
        BoardDto boardDto = new BoardDto();
        boardDto.setId(1);
        boardDto.setNickname("성민zㅣ존");
        boardDto.setContent("의권 짱짱 핵 의심됩니다. 뻬박");
        boardDto.setCreatedTime("2023-01-18 15:06:54.288323");
        boardDto.setModifiedTime("2023-01-19 15:06:54.288323");
        boardDto.setTitle("의권짱짱 핵의심");
        list.add(boardDto);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PostMapping(value="/free")
    public ResponseEntity<String> createFree(@RequestParam String nickname, @RequestParam String title, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("글 게시 성공");
    }

    @PostMapping(value="/notice")
    public ResponseEntity<String>  createNotice(@RequestParam String title, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("글 게시 성공");
    }

    @PostMapping(value="/report")
    public ResponseEntity<String>  createReport(@RequestParam String nickname, @RequestParam String title, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("글 게시 성공");
    }

    @PutMapping(value="/free/{id}")
    public ResponseEntity<String> changeFree(@PathVariable int id, @RequestParam String title, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("글 수정 성공");
    }

    @PutMapping(value="/notice/{id}")
    public ResponseEntity<String>  changeNotice(@PathVariable int id, @RequestParam String title, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("글 수정 성공");
    }

    @PutMapping(value="/report/{id}")
    public ResponseEntity<String>  changeReport(@PathVariable int id, @RequestParam String title, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("글 수정 성공");
    }

    @DeleteMapping(value="/free/{id}")
    public ResponseEntity<String> deleteFree(@PathVariable int id){

        return ResponseEntity.status(HttpStatus.OK).body("글 삭제 성공");
    }

    @DeleteMapping(value="/notice/{id}")
    public ResponseEntity<String>  deleteNotice(@PathVariable int id){

        return ResponseEntity.status(HttpStatus.OK).body("글 삭제 성공");
    }

    @DeleteMapping(value="/report/{id}")
    public ResponseEntity<String>  deleteReport(@PathVariable int id){

        return ResponseEntity.status(HttpStatus.OK).body("글 삭제 성공");
    }

    @GetMapping(value="/free/{id}")
    public ResponseEntity<BoardDto> getFree(@PathVariable("id") int id){
        BoardDto boardDto = new BoardDto();
        boardDto.setId(1);
        boardDto.setNickname("의권 짱짱");
        boardDto.setContent("제곧내");
        boardDto.setCreatedTime("2023-01-18 15:06:54.288323");
        boardDto.setModifiedTime("2023-01-19 15:06:54.288323");
        boardDto.setTitle("내가 제일 잘나가");
        List<CommentDto> commentList = new ArrayList<CommentDto>();
        CommentDto commentDto = new CommentDto();
        commentDto.setContent("ㅋㅋㅋ");
        commentDto.setCreatedTime("2023-01-18 17:06:54.288323");
        commentDto.setModifiedTime("");
        commentDto.setNickname("성민zㅣ존");
        commentList.add(commentDto);
        boardDto.setComments(commentList);
        return ResponseEntity.status(HttpStatus.OK).body(boardDto);
    }

    @GetMapping(value="/notice/{id}")
    public ResponseEntity<BoardDto> getNotice(@PathVariable("id") int id){
        BoardDto boardDto = new BoardDto();
        boardDto.setId(1);
        boardDto.setNickname("관리자");
        boardDto.setContent("랭킹 1위 의권 짱짱과 함께하는 경기 이벤트!");
        boardDto.setCreatedTime("2023-01-18 15:06:54.288323");
        boardDto.setModifiedTime("2023-01-19 15:06:54.288323");
        boardDto.setTitle("2023년 신년 이벤트");
        return ResponseEntity.status(HttpStatus.OK).body(boardDto);
    }

    @GetMapping(value="/report/{id}")
    public ResponseEntity<BoardDto> getReport(@PathVariable("id") int id){
        BoardDto boardDto = new BoardDto();
        boardDto.setId(1);
        boardDto.setNickname("성민zㅣ존");
        boardDto.setContent("의권 짱짱 핵 의심됩니다. 뻬박");
        boardDto.setCreatedTime("2023-01-18 15:06:54.288323");
        boardDto.setModifiedTime("2023-01-19 15:06:54.288323");
        boardDto.setTitle("의권짱짱 핵의심");
        return ResponseEntity.status(HttpStatus.OK).body(boardDto);
    }

    @PostMapping(value="/free/{id}")
    public ResponseEntity<String> createComment(@PathVariable int id, @RequestParam String nickname, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("댓글 게시 성공");
    }

    @PutMapping(value="/free/{id}/{commentId}")
    public ResponseEntity<String> changeComment(@PathVariable int id, @PathVariable int commentId, @RequestParam String content){

        return ResponseEntity.status(HttpStatus.OK).body("댓글 수정 성공");
    }

    @DeleteMapping(value="/free/{id}/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable int id, @PathVariable int commentId){

        return ResponseEntity.status(HttpStatus.OK).body("댓글 삭제 성공");
    }
}
