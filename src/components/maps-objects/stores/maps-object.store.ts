import {action, observable} from 'mobx';
import {MapsObjectService, pickUpdated} from '../services';

export abstract class MapsObjectStore<
  MapsObject extends google.maps.MapsObject<
    MapsObjectEventName,
    MapsObjectOptions,
    MapsObjectEventHandler
  >,
  MapsObjectOptions,
  MapsObjectEventName,
  MapsObjectHandlerName extends string,
  MapsObjectEventHandler,
  Service
> {

  @observable isLoaded: boolean = false;

  listeners: Map<MapsObjectEventHandler, google.maps.MapsEventListener> = new Map();
  google: Google;
  maps: google.Maps;
  service?: Service & MapsObjectService<
    MapsObject,
    MapsObjectEventName,
    MapsObjectOptions,
    MapsObjectEventHandler
  >;

  abstract eventNames: {
    [key in MapsObjectHandlerName]: MapsObjectEventName
  };

  constructor(google: Google) {
    this.google = google;
    this.maps = google.maps;
  }

  abstract groupProps(props: MapsObjectOptions & {
    [key in MapsObjectHandlerName]?: MapsObjectEventHandler
  }): {
    handlers?: {
      [key: string]: MapsObjectEventHandler,
    },
    options?: MapsObjectOptions,
  };

  @action('Set object service')
  setService(
    service: Service & MapsObjectService<
      MapsObject,
      MapsObjectEventName,
      MapsObjectOptions,
      MapsObjectEventHandler
    >,
    handlers?: {
      [key: string]: MapsObjectEventHandler,
    },
  ) {
    this.service = service;
    this.setListeners(handlers);

    this.isLoaded = true;
  }

  setProps(props: MapsObjectOptions & {
    [key in MapsObjectHandlerName]?: MapsObjectEventHandler
  }) {
    const {
      handlers,
      options,
    } = this.groupProps(props);

    this.setOptions(options);
    this.setListeners(handlers);
  }

  setOptions(options: MapsObjectOptions | undefined) {
    if (!this.isLoaded || !options) return;

    this.service!.setOptions(options);
  }

  setListeners(handlers: {
    [key: string]: MapsObjectEventHandler,
  }| undefined) {
    if (!handlers) return;

    const {service} = this;

    if (!service) return;

    Object.keys(handlers).forEach((handlerName) => {
      const handler: MapsObjectEventHandler = handlers[handlerName];
      const eventName: MapsObjectEventName = this.eventNames[
        handlerName as MapsObjectHandlerName
      ];

      service.addListener(eventName, handler);
    });
  }

  updateProps(
    prevProps: MapsObjectOptions & {
      [key in MapsObjectHandlerName]?: MapsObjectEventHandler
    },
    props: MapsObjectOptions & {
      [key in MapsObjectHandlerName]?: MapsObjectEventHandler
    },
  ) {
    const {handlers, options} = this.groupProps(props);
    const {
      handlers: prevHandlers,
      options: prevOptions,
    } = this.groupProps(prevProps);

    this.updateOptions(prevOptions, options);
    this.updateListeners(prevHandlers, handlers);
  }

  updateOptions(
    prevOptions: MapsObjectOptions & {
      [key: string]: any,
    } | undefined,
    options: MapsObjectOptions & {
      [key: string]: any,
    } | undefined,
  ) {
    if (!prevOptions || !options) return;

    const updatedOptions = pickUpdated<MapsObjectOptions>(prevOptions, options);

    if (!updatedOptions) return;

    this.setOptions(updatedOptions);
  }

  updateListeners(
    prevHandlers: {
      [key: string]: MapsObjectEventHandler,
    } | undefined,
    handlers: {
      [key: string]: MapsObjectEventHandler,
    } | undefined,
  ): void {
    if (!handlers && !prevHandlers) return;

    if (!handlers) {
      this.resetListeners();
      return;
    }

    if (!prevHandlers) {
      this.setListeners(handlers);
      return;
    }

    Object.keys({
      ...prevHandlers,
      ...handlers,
    }).forEach((handlerName) => {
      const eventName = this.eventNames[handlerName as MapsObjectHandlerName];
      const handler = handlers[handlerName];
      const prevHandler = prevHandlers[handlerName];

      if (handler === prevHandler) return;

      if (handler) {
        this.addListener(eventName, handler);
      }
      if (prevHandler) {
        this.removeListener(prevHandler);
      }
    });
  }

  addListener(
    eventName: MapsObjectEventName,
    handler: MapsObjectEventHandler,
  ): google.maps.MapsEventListener | undefined {
    if (!this.service) return;

    const listener = this.service.addListener(eventName, handler);

    this.listeners.set(handler, listener);
  }

  removeListener(
    handler: MapsObjectEventHandler,
  ): void {
    const listener = this.listeners.get(handler);

    if (!listener) return;

    listener.remove();
    this.listeners.delete(handler);
  }

  resetListeners(): void {
    this.listeners.forEach((listener) => {
      listener.remove();
    });

    this.listeners = new Map();
  }

  getService(): MapsObjectService<
    MapsObject,
    MapsObjectEventName,
    MapsObjectOptions,
    MapsObjectEventHandler
  > | undefined {
    return this.service;
  }
}
