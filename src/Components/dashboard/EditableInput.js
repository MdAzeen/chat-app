import React, { useCallback, useState } from 'react';
import { Input, InputGroup, Icon,Alert} from 'rsuite';

function EditableInput({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write your name',
    emptyMsg = 'Input is Empty',
  ...Inputprops
}) {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);
  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialValue);
  }, [initialValue]);
  
  const onSaveClick=async()=>{
     const trimmed=input.trim();
     if(trimmed==='')
     {
        Alert.info(emptyMsg,4000);
     }
     if(trimmed!==initialValue)
     {
        await onSave(trimmed)
     }
     setIsEditable(false);
  }
  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...Inputprops}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {
            isEditable &&
            <InputGroup.Button onClick={onSaveClick}>
          <Icon icon="check" />
        </InputGroup.Button>
        }
      </InputGroup>
    </div>
  );
}

export default EditableInput;