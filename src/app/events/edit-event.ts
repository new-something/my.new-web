import {ResourceType} from './resource-type.enum';

export class EditEvent {
  type: ResourceType;
  formId: string;
  id: number;

  public static formOf(type: ResourceType, formId: string): EditEvent {
    const editEvent = new EditEvent();
    editEvent.type = type;
    editEvent.formId = formId;
    return editEvent;
  }

  public static of(type: ResourceType, id: number): EditEvent {
    const editEvent = new EditEvent();
    editEvent.type = type;
    editEvent.id = id;
    return editEvent;
  }
}
