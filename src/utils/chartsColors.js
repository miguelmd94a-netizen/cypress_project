const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);
export const getTagColorByOption = (chart) => {
  switch (chart) {
    case 'Black or African American': {
      return '#9f9f9f';
    }

    case 'Hispanic or Latinx': {
      return '#00a575';
    }

    case 'Asian': {
      return '#001349';
    }
    case 'Native Hawaiian or Pacific Islander': {
      return '#5bbdff';
    }
    case 'American Indian or Alaskan Native': {
      return '#1f63ff';
    }

    case 'Middle Eastern or South Asian': {
      return '#aa00ff';
    }

    case 'Multiracial': {
      return '#ff49b3';
    }

    case 'White': {
      return '#ff9456';
    }

    case 'Not Listed': {
      return '#FF4242';
    }

    case 'Prefer not to answer': {
      return '#006005';
    }

    case 'Abuse of Authority': {
      return '#00a575';
    }
    case 'Discourtesy': {
      return '#004ea3';
    }
    case 'Offensive Language': {
      return '#5bbdff';
    }

    case 'Use of Force': {
      return '#aa00ff';
    }
    case 'Sustained': {
      return '#ff49b3';
    }
    case 'Civilian': {
      return '#004ea3';
    }
    case 'Civilian Oversight': {
      return '#5bbdff';
    }

    case 'Internal Affairs': {
      return '#aa00ff';
    }
    case 'Other': {
      return '#ff49b3';
    }

    case 'Improper Conduct': {
      return '#ff9456';
    }
    case 'Online': {
      return '#004ea3';
    }
    case 'In-Person': {
      return '#5bbdff';
    }

    case 'Email': {
      return '#aa00ff';
    }
    case 'Phone': {
      return '#ff49b3';
    }

    case 'Unfounded': {
      return '#FF4242';
    }
    case 'Complaints': {
      return '#FF4242';
    }

    case 'Not Sustained': {
      return '#006005';
    }

    case 'No Further Action': {
      return '#00a575';
    }
    case 'Compliments': {
      return '#00a575';
    }

    case 'Counseled': {
      return '#004ea3';
    }
    case 'Letter of Reprimand': {
      return '#5bbdff';
    }
    case 'Suspension': {
      return '#1f63ff';
    }

    case 'Demotion': {
      return '#aa00ff';
    }

    case 'Dismissal': {
      return '#ff49b3';
    }

    case 'Resignation': {
      return '#ff9456';
    }

    default: {
      return `#${getRandomColor()}`;
    }
  }
};
