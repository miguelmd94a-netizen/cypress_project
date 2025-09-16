import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit
  }

  body {
    background: white;
    height: 100vh;
    margin: 0 auto;
    overscroll-behavior: none;
    width: 100%;
    font-family: "Roboto";
  }

  ul, li, h1, h2, h3, p, button {
    margin: 0;
  }


  button {
    background: #ffffff00;
    border: 0;
    outline: 0;
  }

  ul {
    padding: 0;
  }
  
  a { 
    text-decoration: none;
    color: #393939
  }

 

  .MuiFilledInput-input {
    padding: 0 10px
  }

  .MuiFilledInput-underline.Mui-disabled:before {
    border: 0 !important;
  }
  .MuiDropzoneArea-root {
    height: 150px !important;
    margin-bottom: 20px;
    min-height: 0 !important;
    max-height: 150px;
    .MuiTypography-h5 {
      font-size: 14px !important
    }

  }

  legend {
    opacity: 0;
    position: absolute;
    overflow: hidden;
  }
  .MuiSelect-root {
    & > span > font {
      opacity: 0
    }
  }

  .MuiPickersCalendarHeader-dayLabel {
    color: rgba(0, 0, 0, 0.38);
    width: 36px;
    height: 16px;
    overflow: hidden;
    margin: 0 2px;
    text-align: center;
  }

  .MuiTabs-indicator {
    background-color: #4b7bff !important;
  }

  .Mui-selected {
    color: #4b7bff !important;
  }

  .MuiTab-wrapper {
    width: 100%;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
  }
  .Mui-checked {
    color: #4b7bff !important;

  }

  .MuiOutlinedInput-adornedStart {
    padding-left: 0 !important;
  }

  @media screen and (max-width: 768px) {
    .MuiGrid-item  {
      max-width: unset !important;
      flex-basis: unset !important;
      width: 100%;
    }
  }
  .chartjs-render-monitor {
    height: 455px !important;
    padding-right: 10px
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type=number] {
    -moz-appearance: textfield;
  }
  .react-code-input {
    display: flex !important;
    width: 90% !important;
    justify-content: space-between;
    margin: 15px auto 10px;
  
  }

  .react-tel-input .form-control:focus {
    box-shadow: unset !important;
  }
  .react-tel-input :disabled  {
    border-bottom: 1px dotted rgba(0, 0, 0, 0.42) !important;
  }
`;

export default GlobalStyles;
