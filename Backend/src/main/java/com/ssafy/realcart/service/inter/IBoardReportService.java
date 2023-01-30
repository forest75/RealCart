package com.ssafy.realcart.service.inter;

import java.util.List;

import com.ssafy.realcart.data.dto.BoardDto;

public interface IBoardReportService {
	
	boolean createReport(BoardDto boardDto);
    List<BoardDto> getBoardReportAll();
    BoardDto getBoardReport(int id);
	boolean changeReport(int id, BoardDto boardDto);
	boolean deleteReport(int id);
}
