import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import { getConfig } from '../config/Config';
import { Renderer } from '../config/Renderer';

export default function Demographics({
  components,
  onSaveFormValues,
  getFormValue,
  organizationId,
}) {
  const config = useMemo(
    () =>
      getConfig({
        componentsFromServer: components,
      }),
    [components]
  );

  console.log('Los componentes son', config);
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
