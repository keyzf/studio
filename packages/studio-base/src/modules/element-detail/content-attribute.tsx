import React, { useContext, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { Element, ElementBaseDetail, ElementAssetsItem } from 'idraw';
import { getElementSize } from 'idraw';
import { Col, Row, Form, InputNumber } from 'antd';
import type { FormInstance } from 'antd';
import { ConfigContext } from '../config-provider';
import { useModuleLocale } from './hooks';
import { DetailAttribute } from './detail-attribute';

import { MultipleColor } from './field-item/multiple-color';

const modName = 'base-element-content-attribute';

export interface ContentAttributeProps {
  className?: string;
  style?: CSSProperties;
  element?: Element | null;
  onChange?: (e: Partial<Element>) => void;
  disabled?: boolean;
  getElementAsset: (assetId?: string) => string | null;
  createElementAsset: (assetItem: ElementAssetsItem) => {
    assetItem: ElementAssetsItem | null;
    assetId: string | null;
  };
}

type FieldType = Pick<ElementBaseDetail, 'background' | 'opacity'>;

const elementToFormData = (element?: Element | null) => {
  let { background, opacity } = element?.detail || {};
  if (!(typeof opacity === 'number' && opacity >= 0 && opacity <= 1)) {
    opacity = 1;
  }
  const formData: FieldType = {
    background,
    opacity
  };
  return formData;
};

export const ContentAttribute = (props: ContentAttributeProps) => {
  const { style, element, disabled, onChange, getElementAsset, createElementAsset } = props;
  const ref = useRef<FormInstance>(null);
  const { createPrefixName } = useContext(ConfigContext);
  const getPrefixName = createPrefixName(modName);
  const rootClassName = getPrefixName();
  const rowClassName = getPrefixName('row');
  const colClassName = getPrefixName('col');
  const formItemClassName = getPrefixName('form-item');
  const onValuesChange = (value: FieldType) => {
    const boxDetail = value;
    onChange?.({ detail: boxDetail } as Partial<Element>);
  };
  const onDetailChange = (elem: Partial<Element>) => {
    onChange?.(elem);
  };
  const moduleLocale = useModuleLocale();

  useEffect(() => {
    const initialValues = elementToFormData(element);
    ref.current?.setFieldsValue(initialValues);
  }, [element]);

  return useMemo(() => {
    return (
      <>
        <Form ref={ref} style={style} className={rootClassName} onValuesChange={onValuesChange}>
          {['rect', 'circle', 'text', 'group'].includes(element?.type as string) && (
            <Row className={rowClassName}>
              <Col className={colClassName} span="10">
                {moduleLocale.background}
              </Col>
              <Col className={colClassName} span="12">
                <Form.Item className={formItemClassName} name="background">
                  <MultipleColor
                    elementSize={element ? getElementSize(element) : undefined}
                    disabled={disabled}
                    // value={element?.detail?.background}
                    // onChange={(value) => {
                    //   onValuesChange({ background: value });
                    // }}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row className={rowClassName}>
            <Col className={colClassName} span="10">
              {moduleLocale.opacity}
            </Col>
            <Col className={colClassName} span="12">
              <Form.Item className={formItemClassName} name="opacity">
                <InputNumber disabled={disabled} size="small" style={{ width: '100%' }} step={0.1} />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <DetailAttribute
          element={element}
          disabled={disabled}
          onChange={onDetailChange}
          getElementAsset={getElementAsset}
          createElementAsset={createElementAsset}
        />
      </>
    );
  }, [moduleLocale, element, disabled, onChange]);
};
