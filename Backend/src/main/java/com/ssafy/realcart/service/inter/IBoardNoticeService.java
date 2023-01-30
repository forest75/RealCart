package com.ssafy.realcart.service.inter;

import java.util.List;

import com.ssafy.realcart.data.dto.BoardDto;

public interface IBoardNoticeService {
	boolean createNotice(BoardDto boardDto);
    List<BoardDto> getBoardNoticeAll();
    BoardDto getBoardNotice(int id);

	boolean changeNotice(int id, BoardDto boardDto);
	boolean deleteNotice(int id);
}
