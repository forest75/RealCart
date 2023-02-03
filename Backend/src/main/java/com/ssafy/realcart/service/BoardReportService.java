package com.ssafy.realcart.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.realcart.data.dao.inter.IBoardReportDAO;
import com.ssafy.realcart.data.dao.inter.IUserDAO;
import com.ssafy.realcart.data.dto.BoardDto;
import com.ssafy.realcart.data.entity.BoardReport;
import com.ssafy.realcart.service.inter.IBoardReportService;
@Service
public class BoardReportService implements IBoardReportService {

	IBoardReportDAO boardReportDAO;
	IUserDAO userDAO;
	private final Logger LOGGER = LoggerFactory.getLogger(BoardReportService.class);
	@Autowired
	public BoardReportService(IBoardReportDAO boardReportDAO, IUserDAO userDAO) {
		this.boardReportDAO = boardReportDAO;
		this.userDAO = userDAO;
	}
	
	@Override
	@Transactional
	public boolean createReport(BoardDto boardDto) {
		BoardReport boardReport = new BoardReport();
		boardReport.setContent(boardDto.getContent());
		boardReport.setTitle(boardDto.getTitle());
		boardReport.setUser(userDAO.checkNickname(boardDto.getNickname()));
		return boardReportDAO.saveReport(boardReport);
	}

	@Override
	@Transactional(readOnly = true)
	public List<BoardDto> getBoardReportAll() {
		List<BoardReport> boardReports = boardReportDAO.getBoardReportAll();
		List<BoardDto> boardDtos = new ArrayList<BoardDto>();
		for (BoardReport boardReport : boardReports) {
			BoardDto boardDto = new BoardDto();
			boardDto.setContent(boardReport.getContent());
			boardDto.setCreatedTime(boardReport.getCreatedDate());
			boardDto.setHit(boardReport.getHit());
			boardDto.setId(boardReport.getId());
			boardDto.setModifiedTime(boardReport.getModifiedDate());
			boardDto.setNickname(boardReport.getUser().getNickname());
			boardDto.setTitle(boardReport.getTitle());
			boardDtos.add(boardDto);
		}
		return boardDtos;
	}

	@Override
	@Transactional(readOnly = true)
	public BoardDto getBoardReport(int id) {
		BoardReport boardReport = boardReportDAO.getBoardReport(id);
		if(boardReport == null) return null;
		BoardDto boardDto = new BoardDto();
		boardDto.setContent(boardReport.getContent());
		boardDto.setCreatedTime(boardReport.getCreatedDate());
		boardDto.setHit(boardReport.getHit());
		boardDto.setId(boardReport.getId());
		boardDto.setModifiedTime(boardReport.getModifiedDate());
		boardDto.setNickname(boardReport.getUser().getNickname());
		boardDto.setTitle(boardReport.getTitle());
		return boardDto;
	}

	@Override
	@Transactional
	public boolean changeReport(int id, BoardDto boardDto) {
		BoardReport boardReport = boardReportDAO.getBoardReport(id);
		if(boardReport != null) {
			boardReport.setContent(boardDto.getContent());
			boardReport.setTitle(boardDto.getTitle());
			boardReportDAO.saveReport(boardReport);
			return true;
		}
		return false;
	}

	@Override
	@Transactional
	public boolean deleteReport(int id) {
		return boardReportDAO.deleteReport(id);
	}

}
