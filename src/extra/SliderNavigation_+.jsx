import React from 'react';
/* STYLES */
import { selectedNavigationMenuItem, notSelectedNavigationMenuItem } from '../assets/styles/less/components/sliderNavigation.less';


function getSelectedStyledLabel(label, selected) {
    if (selected) {
        return <span className={selectedNavigationMenuItem}>{label}</span>;
    } else {
        return <span className={notSelectedNavigationMenuItem}>{label}</span>;
    }
}


const marks = {
    100: {
        style: {},
        label: getSelectedStyledLabel('About', true)
    },
    80: {
        style: {},
        label: getSelectedStyledLabel('Experience', false)
    },
    60: {
        style: {},
        label: getSelectedStyledLabel('Education', false)
    }
    ,
    40: {
        style: {},
        label: getSelectedStyledLabel('Skills', false)
    }
    ,
    20: {
        style: {},
        label: getSelectedStyledLabel('Interests', false)
    },
    0: {
        style: {},
        label: getSelectedStyledLabel('Certifications', false)
    }
};

export function getSliderNavigationMarks(navigationValue) {
    let newMarks = marks;
    /* SVUOTO TUTTI GLI STILI */
    let arrayOfProperties = Object.keys(marks);
    arrayOfProperties.map((property) => {
        let label = getLabelText(newMarks[property].label);
        newMarks[property].label = getSelectedStyledLabel(label, false);
    });
    /* RIEMPO LO STILE CHE è STATO SELEZIONAT */
    let label = getLabelText(newMarks[navigationValue].label);
    newMarks[navigationValue].label = getSelectedStyledLabel(label, true);
    /* RITORNO L'ARRAY MODIFICATO */
    return newMarks;
}

function getLabelText(label) {
    return label.props.children;
}

export function isNavigationItem(value) {
    let arrayOfProperties = Object.keys(marks);
    let exist = arrayOfProperties.find(x => x === (value + ''));
    return exist || false;
}