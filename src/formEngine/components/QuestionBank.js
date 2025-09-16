import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import { getConfig } from '../config/Config';
import { Renderer } from '../config/Renderer';

export default function QuestionBank({
  components,
  onSaveFormValues,
  getFormValue,
  organizationId,
  imagesPreview,
}) {
  const config = useMemo(
    () =>
      getConfig({
        componentsFromServer: components,
        imagesPreview,
      }),
    [components]
  );

  return (
    <Box paddingBottom="20px">
      <Renderer
        config={config}
        onSaveFormValues={onSaveFormValues}
        getFormValue={getFormValue}
        isQuestionBankRender
        organizationId={organizationId}
      />
    </Box>
  );
}
