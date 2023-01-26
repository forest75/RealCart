package com.ssafy.realcart.data.dao.inter;

import com.ssafy.realcart.data.entity.BoardFree;
import com.ssafy.realcart.data.entity.Comment;
import com.ssafy.realcart.data.entity.User;

import java.util.List;

public interface IBoardFreeDAO {
    boolean createFree(BoardFree boardFree);
    List<BoardFree> getBoardFreeAll();
    BoardFree getBoardFree(int id);
    List<Comment> getComment(int id);

    boolean createFreeComment(Comment comment);
}
