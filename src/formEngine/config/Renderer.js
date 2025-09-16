import React, { Fragment } from 'react';

const mapPropsToConfig = (config) => {
  const configWithProps = [];
  config.forEach((item) => {
    if (item.component) {
      const { component, ...props } = item;

      configWithProps.push({
        ...props,
        Component: component,
      });
    }
  });

  return configWithProps;
};

export const Renderer = ({
  config,
  onSaveFormValues,
  getFormValue,
  isQuestionBankRender = false,
  organizationId,
}) => {
  if (!config) {
    throw new Error('You are calling Renderer with no config.');
  }

  const configWithProps = mapPropsToConfig(config);
  const renderComponents = (items) =>
    items.map((item, itemIndex) => {
      const { Component, ...props } = item;

      return (
        <Fragment key={itemIndex}>
          {isQuestionBankRender ? (
            <Component
              {...props}
              onSaveFormValues={(value, otherIndex) =>
                onSaveFormValues(value, otherIndex)
              }
              getFormValue={() => getFormValue(itemIndex)}
              subIndex={itemIndex}
              componentIndex={itemIndex}
              organizationId={organizationId}
            />
          ) : (
            <Component
              {...props}
              onSaveFormValues={(value) => onSaveFormValues(itemIndex, value)}
              componentIndex={itemIndex}
              getFormValue={() => getFormValue(itemIndex)}
              organizationId={organizationId}
            />
          )}
        </Fragment>
      );
    });

  return renderComponents(configWithProps);
};
