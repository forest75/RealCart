package com.ssafy.realcart.data.dao;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.realcart.data.dao.inter.IBoardReportDAO;
import com.ssafy.realcart.data.entity.BoardReport;
import com.ssafy.realcart.data.repository.IBoardReportRepository;

public class BoardReportDAO implements IBoardReportDAO {

	IBoardReportRepository boardReportRepository;
	private final Logger LOGGER = LoggerFactory.getLogger(BoardReportDAO.class);
	
	@Autowired
	public BoardReportDAO(IBoardReportRepository boardReportRepository) {
		this.boardReportRepository = boardReportRepository;
	}
	
	@Override
	public boolean saveReport(BoardReport boardReport) {
		if(boardReportRepository.save(boardReport) != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<BoardReport> getBoardReportAll() {
		return boardReportRepository.findAll();
	}

	@Override
	public BoardReport getBoardReport(int id) {
		Optional<BoardReport> selectedBoardReport = boardReportRepository.findById(id);
		if(selectedBoardReport.isPresent()) {
			BoardReport boardReport = selectedBoardReport.get();
			boardReport.setHit(boardReport.getHit() + 1);
			boardReportRepository.save(boardReport);
			return boardReport;
		}
		return null;
	}

	@Override
	public boolean deleteReport(int id) {
		Optional<BoardReport> selectedBoardReport = boardReportRepository.findById(id);
		if(selectedBoardReport.isPresent()) {
			BoardReport boardReport = selectedBoardReport.get();
			boardReportRepository.delete(boardReport);
			return true;
		}
		return false;
	}

}
