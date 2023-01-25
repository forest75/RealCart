package com.ssafy.realcart.data.repository;

import com.ssafy.realcart.data.entity.BoardFree;
import com.ssafy.realcart.data.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IBoardFreeRepository extends JpaRepository<BoardFree, Integer> {

}
