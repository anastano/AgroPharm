package com.agropharm.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import java.util.Set;
import java.util.stream.Collectors;

public class DTOUtils {
    public DTOEntity convertToDto(Object obj , DTOEntity mapper){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(obj, mapper.getClass());
    }

    public <DTOEntity, Object> Set<DTOEntity> convertToDtos(Set<Object> obj, DTOEntity mapper){

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return (Set<DTOEntity>) obj.stream().map(o -> modelMapper.map(o, mapper.getClass())).collect(Collectors.toSet());

    }

    public Object convertToEntity(Object obj, DTOEntity mapper){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(mapper, obj.getClass());
    }
    public Object convertToEntityStrict(Object obj, DTOEntity mapper){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(mapper, obj.getClass());
    }

}
