package com.ssafy.realcart.service.inter;

import java.util.List;

import com.ssafy.realcart.data.dto.BoardReportDto;
import com.ssafy.realcart.data.dto.BoardReportRequestDto;

public interface IBoardReportService {
	
	boolean createReport(BoardReportRequestDto boardDto);
    List<BoardReportDto> getBoardReportAll();
    BoardReportDto getBoardReport(int id);
	boolean changeReport(int id, BoardReportRequestDto boardDto);
	boolean deleteReport(int id);
}
