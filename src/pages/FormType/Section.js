import { Typography, makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import { getConfig } from '../../formEngine/config/Config';
import { Renderer } from '../../formEngine/config/Renderer';

const useStyles = makeStyles(() => ({
  sectionTitle: {
    padding: 22,
    textAlign: 'center',
    fontSize: 16,
  },
}));

export default function Section({
  name,
  components,
  getComponents,
  onSaveFormValues,
  getFormValue,
  organizationId,
  imagesPreview,
  setImagesPreview,
  pageIndex,
  sectionIndex,
}) {
  const classes = useStyles();

  const config = useMemo(
    () =>
      getConfig({
        componentsFromServer: getComponents(components),
        imagesPreview: { pageIndex, sectionIndex, imagesPreview, setImagesPreview },
      }),
    [components, getComponents]
  );

  return (
    <div>
      <Typography className={classes.sectionTitle}>{name}</Typography>
      <Renderer
        config={config}
        onSaveFormValues={onSaveFormValues}
        orderComponents={false}
        getFormValue={getFormValue}
        organizationId={organizationId}
      />
    </div>
  );
}
