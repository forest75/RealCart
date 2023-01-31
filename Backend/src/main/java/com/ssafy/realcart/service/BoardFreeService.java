package com.ssafy.realcart.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.realcart.data.dao.inter.IBoardFreeDAO;
import com.ssafy.realcart.data.dao.inter.IUserDAO;
import com.ssafy.realcart.data.dto.BoardDto;
import com.ssafy.realcart.data.dto.CommentDto;
import com.ssafy.realcart.data.entity.BoardFree;
import com.ssafy.realcart.data.entity.Comment;
import com.ssafy.realcart.data.entity.User;
import com.ssafy.realcart.service.inter.IBoardFreeService;

@Service
public class BoardFreeService implements IBoardFreeService {

    private IBoardFreeDAO boardFreeDAO;
    private IUserDAO userDAO;
    private final Logger LOGGER = LoggerFactory.getLogger(BoardFreeService.class);

    @Autowired
    public BoardFreeService(IBoardFreeDAO boardFreeDAO, IUserDAO userDAO){
        this.boardFreeDAO = boardFreeDAO;
        this.userDAO = userDAO;
    }


    @Override
    public boolean createFree(BoardDto boardDto) {
        LOGGER.info("BoardFreeService CreateFree 메세드 접속");
        BoardFree boardFree = new BoardFree();
        String nickname = boardDto.getNickname();
        LOGGER.info(nickname);
        try{
            User user = userDAO.checkNickname(nickname);
            if(user != null){
                boardFree.setContent(boardDto.getContent());
                boardFree.setTitle(boardDto.getTitle());
                boardFree.setUser(user);
                boardFree.setHit(0);
                return boardFreeDAO.saveFree(boardFree);
            }
        }catch(Exception e){
            LOGGER.info("회원정보가 없음");
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<BoardDto> getBoardFreeAll() {
        List<BoardFree> list = boardFreeDAO.getBoardFreeAll();
        List<BoardDto> boardDtos = new ArrayList<BoardDto>();
        for (BoardFree free:
             list) {
            BoardDto boardDto = new BoardDto();
            boardDto.setId(free.getId());
            boardDto.setTitle(free.getTitle());
            boardDto.setCreatedTime(free.getCreatedDate());
            boardDto.setModifiedTime(free.getModifiedDate());
            boardDto.setContent(free.getContent());
            boardDto.setNickname(free.getUser().getNickname());
            boardDto.setHit(free.getHit());
            List<Comment> comments = boardFreeDAO.getCommentByBoardId(free.getId());
            List<CommentDto> commentDtos = new ArrayList<CommentDto>();
            for (Comment comment:
                 comments) {
                CommentDto commentDto = new CommentDto();
                commentDto.setNickname(comment.getUser().getNickname());
                commentDto.setContent(comment.getContent());
                commentDto.setCreatedTime(comment.getCreatedDate());
                commentDtos.add(commentDto);
            }
            boardDto.setComments(commentDtos);
            boardDtos.add(boardDto);
        }
        return boardDtos;
    }

    @Override
    public BoardDto getBoardFree(int id) {
        BoardFree board = boardFreeDAO.getBoardFree(id);
        if(board != null){
            board.setHit(board.getHit()+1);
            boardFreeDAO.saveFree(board);
            BoardDto boardDto = new BoardDto();
            boardDto.setHit(board.getHit());
            boardDto.setNickname(board.getUser().getNickname());
            boardDto.setTitle(board.getTitle());
            boardDto.setContent(board.getContent());
            boardDto.setId(board.getId());
            boardDto.setCreatedTime(board.getCreatedDate());
            boardDto.setModifiedTime(board.getModifiedDate());
            List<Comment> comments = boardFreeDAO.getCommentByBoardId(board.getId());
            List<CommentDto> commentDtos = new ArrayList<CommentDto>();
            for (Comment comment:
                    comments) {
                CommentDto commentDto = new CommentDto();
                commentDto.setNickname(comment.getUser().getNickname());
                commentDto.setContent(comment.getContent());
                commentDto.setCreatedTime(comment.getCreatedDate());
                commentDto.setModifiedTime(comment.getModifiedDate());
                commentDtos.add(commentDto);
            }
            boardDto.setComments(commentDtos);
            return boardDto;
        }
        return null;
    }

    @Override
    public boolean createFreeComment(int id, CommentDto commentDto) {
        BoardFree board = boardFreeDAO.getBoardFree(id);
        User user = userDAO.checkNickname(commentDto.getNickname());
        Comment comment = new Comment();
        comment.setBoardFree(board);
        comment.setUser(user);
        comment.setContent(commentDto.getContent());
        return boardFreeDAO.saveFreeComment(comment);

    }


	@Override
	public boolean changeFree(int id, BoardDto boardDto) {
		BoardFree board = boardFreeDAO.getBoardFree(id);
		board.setContent(boardDto.getContent());
		board.setTitle(boardDto.getTitle());
		return boardFreeDAO.saveFree(board);
	}


	@Override
	public boolean deleteFree(int id) {
		return boardFreeDAO.deleteFree(id);
	}


	@Override
	public boolean changeComment(int commentId, CommentDto commentDto) {
		Comment comment = boardFreeDAO.getComment(commentId); 
		if(comment != null) {
			comment.setContent(commentDto.getContent());
			boardFreeDAO.saveFreeComment(comment);
			return true;
		}
		return false;
	}


	@Override
	public boolean deleteComment(int commentId) {
		return boardFreeDAO.deleteComment(commentId);
	}
}