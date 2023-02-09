package com.ssafy.realcart.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.realcart.data.dao.inter.IRecordDAO;
import com.ssafy.realcart.data.dao.inter.IUserDAO;
import com.ssafy.realcart.data.dto.RecordDto;
import com.ssafy.realcart.data.entity.Record;
import com.ssafy.realcart.data.entity.User;
import com.ssafy.realcart.service.inter.IRecordService;

@Service
public class RecordService implements IRecordService {

	private IRecordDAO recordDAO;
	private IUserDAO userDAO;
    private final Logger LOGGER = LoggerFactory.getLogger(RecordService.class);

    @Autowired
    public RecordService(IRecordDAO recordDAO, IUserDAO userDAO){
        this.recordDAO = recordDAO;
        this.userDAO = userDAO;
    }

	@Override
	public List<RecordDto> getRecord() {
		List<Record> list = recordDAO.getAllRecord();
		List<RecordDto> dtolist = new ArrayList<RecordDto>();
		SimpleDateFormat sdf = new SimpleDateFormat("mm:ss.SSS");
		int rank = 1;
		for (Record record : list) {
			RecordDto recordDto = new RecordDto();
			recordDto.setLapTime(sdf.format(new Date(record.getLapTime())));
			recordDto.setNickname(record.getUser().getNickname());
			recordDto.setRank(rank++);
			dtolist.add(recordDto);
		}
		return dtolist;
	}

	@Override
	public RecordDto getUserRecord(String nickname) {
		List<RecordDto> list = getRecord();
		for (RecordDto recordDto : list) {
			if(recordDto.getNickname().equals(nickname)) {
				return recordDto;
			}
		}
		return null;
	}
    
    
}
