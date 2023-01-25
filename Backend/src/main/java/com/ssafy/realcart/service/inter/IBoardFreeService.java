package com.ssafy.realcart.service.inter;

import com.ssafy.realcart.data.dto.BoardDto;
import com.ssafy.realcart.data.dto.CommentDto;
import com.ssafy.realcart.data.entity.BoardFree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IBoardFreeService {

    boolean createFree(BoardDto boardDto);
    List<BoardDto> getBoardFreeAll();
    BoardDto getBoardFree(int id);
    boolean createFreeComment(int id, CommentDto commentDto);

}
