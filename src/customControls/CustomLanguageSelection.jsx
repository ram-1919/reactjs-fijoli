

import React from 'react'
import "./CustomLanguageSelection.css"
import { useState } from 'react';
import { useSelector } from "react-redux";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {MenuItem, Select } from "@mui/material";

const ITEM_HEIGHT = 30;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
      width: 200,
    },
  },
};

const  CustomLanguageSelection = (props) =>{

  const [selectedLang,    setselectedLang]    = useState([]);
  const lstofsupportedLanguages               = useSelector((state)=> state.storeComponent.configData.languages);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setselectedLang(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    props.handleChange(typeof value === 'string' ? value.split(',') : value);
  };    

  return (
    <div>
      <FormControl 
          sx={{ m: 1, width: 200, borderColor: "black"}}>
            <InputLabel id="demo-multiple-checkbox-label" style={{color: "black" }}>Languages I Speak</InputLabel>
              <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedLang}
                  onChange={handleChange}
                  input={<OutlinedInput label="Languages I Speak"/>}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  style={{borderRadius: '50px', borderColor:"black", height: "30px"}}
              >
                {lstofsupportedLanguages.map((name) => (
                  <MenuItem key={name} value={name}>
                      <Checkbox checked={selectedLang.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                  </MenuItem>
                ))}
          </Select>
      </FormControl>
    </div>
  )
}

export default CustomLanguageSelection;