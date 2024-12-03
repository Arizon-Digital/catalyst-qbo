export const ActionTypes = {
  INIT: 'INIT',
  CLEAN_UP: 'CLEAN_UP',

  REGISTER_DOCUMENT: 'REGISTER_DOCUMENT',
  UNREGISTER_DOCUMENT: 'UNREGISTER_DOCUMENT',

  CHANGE_DOCUMENT: 'CHANGE_DOCUMENT',

  REGISTER_BUILDER_DOCUMENT: 'REGISTER_BUILDER_DOCUMENT',
  UNREGISTER_BUILDER_DOCUMENT: 'UNREGISTER_BUILDER_DOCUMENT',

  REGISTER_COMPONENT: 'REGISTER_COMPONENT',
  UNREGISTER_COMPONENT: 'UNREGISTER_COMPONENT',

  REGISTER_BUILDER_COMPONENT: 'REGISTER_BUILDER_COMPONENT',
  UNREGISTER_BUILDER_COMPONENT: 'UNREGISTER_BUILDER_COMPONENT',

  REGISTER_REACT_COMPONENT: 'REGISTER_REACT_COMPONENT',
  UNREGISTER_REACT_COMPONENT: 'UNREGISTER_REACT_COMPONENT',

  MOUNT_COMPONENT: 'MOUNT_COMPONENT',
  UNMOUNT_COMPONENT: 'UNMOUNT_COMPONENT',

  REGISTER_COMPONENT_HANDLE: 'REGISTER_COMPONENT_HANDLE',
  UNREGISTER_COMPONENT_HANDLE: 'UNREGISTER_COMPONENT_HANDLE',

  REGISTER_MEASURABLE: 'REGISTER_MEASURABLE',
  UNREGISTER_MEASURABLE: 'UNREGISTER_MEASURABLE',

  CHANGE_ELEMENT_BOX_MODELS: 'CHANGE_ELEMENT_BOX_MODELS',

  CHANGE_DOCUMENT_ELEMENT_SIZE: 'CHANGE_DOCUMENT_ELEMENT_SIZE',
  CHANGE_DOCUMENT_ELEMENT_SCROLL_TOP: 'CHANGE_DOCUMENT_ELEMENT_SCROLL_TOP',
  SCROLL_DOCUMENT_ELEMENT: 'SCROLL_DOCUMENT_ELEMENT',

  REGISTER_PROP_CONTROLLERS_HANDLE: 'REGISTER_PROP_CONTROLLERS_HANDLE',
  UNREGISTER_PROP_CONTROLLERS_HANDLE: 'UNREGISTER_PROP_CONTROLLERS_HANDLE',
  REGISTER_PROP_CONTROLLERS: 'REGISTER_PROP_CONTROLLERS',
  UNREGISTER_PROP_CONTROLLERS: 'UNREGISTER_PROP_CONTROLLERS',
  MESSAGE_HOST_PROP_CONTROLLER: 'MESSAGE_HOST_PROP_CONTROLLER',
  MESSAGE_BUILDER_PROP_CONTROLLER: 'MESSAGE_BUILDER_PROP_CONTROLLER',

  CHANGE_API_RESOURCE: 'CHANGE_API_RESOURCE',
  EVICT_API_RESOURCE: 'EVICT_API_RESOURCE',

  SET_IS_IN_BUILDER: 'SET_IS_IN_BUILDER',

  HANDLE_WHEEL: 'HANDLE_WHEEL',
  HANDLE_POINTER_MOVE: 'HANDLE_POINTER_MOVE',

  API_RESOURCE_FULFILLED: 'API_RESOURCE_FULFILLED',

  SET_BUILDER_EDIT_MODE: 'SET_BUILDER_EDIT_MODE',
  MAKESWIFT_CONNECTION_INIT: 'MAKESWIFT_CONNECTION_INIT',
  MAKESWIFT_CONNECTION_CHECK: 'MAKESWIFT_CONNECTION_CHECK',

  BUILDER_POINTER_MOVE: 'BUILDER_POINTER_MOVE',
  ELEMENT_FROM_POINT_CHANGE: 'ELEMENT_FROM_POINT_CHANGE',

  SET_BREAKPOINTS: 'SET_BREAKPOINTS',

  SET_LOCALE: 'SET_LOCALE',

  SET_LOCALIZED_RESOURCE_ID: 'SET_LOCALIZED_RESOURCE_ID',
} as const;
