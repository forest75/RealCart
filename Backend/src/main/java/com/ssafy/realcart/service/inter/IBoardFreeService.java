package com.ssafy.realcart.service.inter;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.realcart.data.dto.BoardDto;
import com.ssafy.realcart.data.dto.CommentDto;

@Service
public interface IBoardFreeService {

    boolean createFree(BoardDto boardDto);
    List<BoardDto> getBoardFreeAll();
    BoardDto getBoardFree(int id);
    boolean createFreeComment(int id, CommentDto commentDto);
	boolean changeFree(int id, BoardDto boardDto);
	boolean deleteFree(int id);
	boolean changeComment(int commentId, CommentDto commentDto);
	boolean deleteComment(int commentId);
}
