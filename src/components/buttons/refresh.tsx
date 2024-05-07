import React from "react";
import { useRefreshButton } from "@refinedev/core";
import { RedoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { RefreshButtonProps } from "@refinedev/antd";

/**
 * `<RefreshButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  hideText = false,
  dataProviderName,
  children,
  meta: _meta,
  metaData: _metaData,
  ...rest
}) => {
  const { onClick, label, loading } = useRefreshButton({
    resource: resourceNameFromProps ?? propResourceNameOrRouteName,
    id: recordItemId,
    dataProviderName,
  });

  return (
    <Button
      onClick={onClick}
      icon={<RedoOutlined spin={loading} />}
      className={RefineButtonClassNames.RefreshButton}
      {...rest}
    >
      {!hideText && (children ?? label)}
    </Button>
  );
};
