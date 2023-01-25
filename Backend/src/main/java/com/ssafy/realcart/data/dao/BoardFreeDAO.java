package com.ssafy.realcart.data.dao;

import com.ssafy.realcart.data.dao.inter.IBoardFreeDAO;
import com.ssafy.realcart.data.entity.BoardFree;
import com.ssafy.realcart.data.entity.Comment;
import com.ssafy.realcart.data.repository.IBoardFreeRepository;
import com.ssafy.realcart.data.repository.ICommentRepository;
import com.ssafy.realcart.data.repository.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BoardFreeDAO implements IBoardFreeDAO {

    private IBoardFreeRepository boardFreeRepository;
    private ICommentRepository commentRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(BoardFreeDAO.class);


    @Autowired
    public BoardFreeDAO(IBoardFreeRepository boardFreeRepository, ICommentRepository commentRepository) {
        this.boardFreeRepository = boardFreeRepository;
        this.commentRepository = commentRepository;
    }


    @Override
    public boolean createFree(BoardFree boardFree) {
        boardFreeRepository.save(boardFree);
        return true;
    }

    @Override
    public List<BoardFree> getBoardFreeAll() {
        return boardFreeRepository.findAll();
    }

    @Override
    public BoardFree getBoardFree(int id) {
        Optional<BoardFree> article = boardFreeRepository.findById(id);
        if(article.isPresent()){
            BoardFree boardFree = article.get();
            boardFree.setHit(boardFree.getHit() + 1);
            boardFreeRepository.save(boardFree);
            return boardFree;
        }
        return null;
    }

    @Override
    public List<Comment> getComment(int id) {
        return commentRepository.findByBOARD_FK(id);
    }

    @Override
    public boolean createFreeComment(Comment comment) {
        if(commentRepository.save(comment) != null){
            return true;
        }
        return false;
    }
}
