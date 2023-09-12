import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

    :root {
        --bg: 20, 20, 20;
        --secondary-bg: 30, 30, 30;
        --tertiary-bg: #191919;
        --fourth-bg: #0f0f0f;
        --fifth-bg: #8b33ff;

        --fg: 220, 220, 220;
        --secondary-fg: #727272;

        --box-shadow:0px 0px 1px .5px rgba(255, 255, 255, .5);
        --border-color: rgba(95, 95, 95, 0.5);
        --box-shadow-two:0px 0px 25px 1px rgba(0, 0, 0, 0.15);
        --font-one: 'Roboto', sans-serif;
        --max-width: 1600px;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: var(--font-one);
        list-style-type: none;
        text-decoration: none;
    }

    .mask {
        position: absolute;
        height: 0;
        width: 0;
    }


    form > * {
        font-size: 15px;
        font-weight: bold;
        outline: none;
    }

    html, body {
        overflow-x: hidden;
    }

    body > div {
        min-height: 100vh;
        width: 100%;
        display: grid;
        grid-template-rows: min-content auto min-content !important;
        grid-template-columns: auto min-content !important;
        grid-template-areas: 
            'page-header'
            'page-main'  
            'page-footer' 
        !important;
        color: rgb(var(--fg));
        box-sizing: border-box;
        background-color: transparent !important;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-color: var(--fourth-bg) !important;
        @media (max-width: 1280px) {
            grid-template-areas: initial !important;
        }
    }

    a {
        color: white;
    }

    .title {
        font-family: var(--font-one);
    }

    h2 {
        font-size: 25px !important;
        margin: 0 0 4rem 0;
        font-family: var(--font-one);
    }

    h3 {
        font-size: 18px !important;
        margin-bottom: .5em;
        font-family: var(--font-one);
    }

    p {
        line-height: 1.25em;
        font-size: 1.1em !important;
        text-align: justify;
        font-family: var(--font-one);
    }

    input {
        font-size: 15px;
    }

    .github-profile {
        display: flex;
        align-items: center;
        gap: 10px;
        text-align: center;
    }

    .github-profile > span {
        font-weight: bolder;
        font-size: 13.3333px;
    }

    .github-profile > span, .github-profile > svg > * {
        font-weight: bolder;
        color: #ffffff;
        stroke: #ffffff;
    }
`;