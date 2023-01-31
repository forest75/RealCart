package com.ssafy.realcart.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.realcart.data.dao.inter.IBoardNoticeDAO;
import com.ssafy.realcart.data.dto.BoardDto;
import com.ssafy.realcart.data.entity.BoardNotice;
import com.ssafy.realcart.service.inter.IBoardNoticeService;
@Service
public class BoardNoticeService implements IBoardNoticeService {
	
	private IBoardNoticeDAO boardNoticeDAO;
    private final Logger LOGGER = LoggerFactory.getLogger(BoardNoticeService.class);

    @Autowired
    public BoardNoticeService(IBoardNoticeDAO boardNoticeDAO){
        this.boardNoticeDAO = boardNoticeDAO;
    }

	@Override
	public boolean createNotice(BoardDto boardDto) {
		BoardNotice boardNotice = new BoardNotice();
		boardNotice.setContent(boardDto.getContent());
		boardNotice.setTitle(boardDto.getTitle());
		if(boardNoticeDAO.saveNotice(boardNotice)) {
			return true;
		}
		return false;
	}

	@Override
	public List<BoardDto> getBoardNoticeAll() {
		List<BoardNotice> boardNotices = boardNoticeDAO.getBoardNoticeAll();
		List<BoardDto> boardDtos = new ArrayList<BoardDto>();
		for (BoardNotice boardNotice : boardNotices) {
			BoardDto boardDto = new BoardDto();
			boardDto.setContent(boardNotice.getContent());
			boardDto.setCreatedTime(boardNotice.getCreatedDate());
			boardDto.setId(boardNotice.getId());
			boardDto.setModifiedTime(boardNotice.getModifiedDate());
			boardDto.setTitle(boardNotice.getTitle());
			boardDtos.add(boardDto);
		}
		return boardDtos;
	}

	@Override
	public BoardDto getBoardNotice(int id) {
		BoardNotice boardNotice = boardNoticeDAO.getBoardNotice(id);
		if(boardNotice == null) return null;
		BoardDto boardDto = new BoardDto();
		boardDto.setContent(boardNotice.getContent());
		boardDto.setCreatedTime(boardNotice.getCreatedDate());
		boardDto.setId(boardNotice.getId());
		boardDto.setModifiedTime(boardNotice.getModifiedDate());
		boardDto.setTitle(boardNotice.getTitle());
		return boardDto;
	}

	@Override
	public boolean changeNotice(int id, BoardDto boardDto) {
		BoardNotice boardNotice = boardNoticeDAO.getBoardNotice(id);
		if(boardNotice != null) {
			boardNotice.setContent(boardDto.getContent());
			boardNotice.setTitle(boardDto.getTitle());
			return boardNoticeDAO.saveNotice(boardNotice);
		}
		return false;
	}

	@Override
	public boolean deleteNotice(int id) {
		return boardNoticeDAO.deleteNotice(id);
	}

}
