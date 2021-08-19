import { useContext, useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import {
  EditOutlined, LockOutlined, LockFilled, CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import eventHub from '../../util/event-hub';
import { StudioContext } from './../../context';
 

type TypeProps = {
  maxHeight?: number,
  element: TypeElement<keyof TypeElemDesc>
}

export const Item = (props: TypeProps) => {
  const { element } = props;
  const context = useContext(StudioContext);
  const { selectedElementUUID } = context;
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  const [isEdit, setIsEdit] = useState(false);
  const [elemName, setElemName] = useState(element.name);

  useEffect(() => {
    setElemName(element.name);
  }, [element])


  const onClickEdit = useCallback(() => {
    setIsEdit(true)
  }, []);

  const onChangeInput = useCallback((e) => {
    setElemName(e.target.value || '');
  }, []);

  const onConfirmElemName = useCallback(() => {
    element.name = elemName;
    eventHub.trigger('studioUpdateElement', element);
    setIsEdit(false);
  }, [elemName, element]);

  const onClickSwitchLock = useCallback(() => {
    element.lock = !element.lock;
    eventHub.trigger('studioUpdateElement', element);
    setIsEdit(false);
  }, [element]);

  const onClickDelete = useCallback(() => {
    eventHub.trigger('studioDeleteElement', element.uuid);
  }, [element]);

  return (
    <div
      className={classnames({
        'idraw-studio-element-item': true,
        'element-item-active': (element.uuid && selectedElementUUID && element.uuid === selectedElementUUID)
      })}
      onClick={() => {
        eventHub.trigger('studioSelectElement', { uuid: element.uuid });
      }}
    >
      {isEdit === true ? (
        <Input 
          size="small" value={elemName} style={{width: 140}}
          onChange={onChangeInput}
        />
      ) : (
        <span className="studio-element-item-name">
          {element.name || 'Unnamed'}
        </span>
      )}

      <span className="studio-element-item-action">
        {isEdit === true ? (
          <CheckCircleOutlined
            className="idraw-studio-element-icon"
            onClick={onConfirmElemName}
          />
        ) : (
          <EditOutlined
            className="idraw-studio-element-icon"
            onClick={onClickEdit}
          />
        )}

        {element.lock === true ? (
          <LockFilled
            className="idraw-studio-element-icon icon-active"
            onClick={onClickSwitchLock} />
        ) : (
          <LockOutlined
            className="idraw-studio-element-icon"
            onClick={onClickSwitchLock} />
        )}
        <DeleteOutlined
          className="idraw-studio-element-icon"
          onClick={onClickDelete}
        />         
      </span>
      
    </div>
  )
}
 