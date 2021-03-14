import { l as leafletSrc } from './common/leaflet-src-c8a58cbb.js';
import { r as react } from './common/index-d0e3fe20.js';
import { r as reactDom } from './common/index-d471eedc.js';
import './common/_commonjsHelpers-eb5a497e.js';

function useAttribution(map, attribution) {
  const attributionRef = react.useRef(attribution);
  react.useEffect(function updateAttribution() {
    if (attribution !== attributionRef.current && map.attributionControl != null) {
      if (attributionRef.current != null) {
        map.attributionControl.removeAttribution(attributionRef.current);
      }

      if (attribution != null) {
        map.attributionControl.addAttribution(attribution);
      }
    }

    attributionRef.current = attribution;
  }, [map, attribution]);
}

const CONTEXT_VERSION = 1;
const LeafletContext = /*#__PURE__*/react.createContext(null);
const LeafletProvider = LeafletContext.Provider;
function useLeafletContext() {
  const context = react.useContext(LeafletContext);

  if (context == null) {
    throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>');
  }

  return context;
}

function createContainerComponent(useElement) {
  function ContainerComponent(props, ref) {
    const {
      instance,
      context
    } = useElement(props).current;
    react.useImperativeHandle(ref, () => instance);
    return props.children == null ? null : /*#__PURE__*/react.createElement(LeafletProvider, {
      value: context
    }, props.children);
  }

  return /*#__PURE__*/react.forwardRef(ContainerComponent);
}
function createDivOverlayComponent(useElement) {
  function OverlayComponent(props, ref) {
    const [isOpen, setOpen] = react.useState(false);
    const {
      instance
    } = useElement(props, setOpen).current;
    react.useImperativeHandle(ref, () => instance);
    react.useEffect(function updateOverlay() {
      if (isOpen) {
        instance.update();
      }
    }, [instance, isOpen, props.children]); // @ts-ignore _contentNode missing in type definition

    const contentNode = instance._contentNode;
    return contentNode ? /*#__PURE__*/reactDom.createPortal(props.children, contentNode) : null;
  }

  return /*#__PURE__*/react.forwardRef(OverlayComponent);
}
function createLeafComponent(useElement) {
  function LeafComponent(props, ref) {
    const {
      instance
    } = useElement(props).current;
    react.useImperativeHandle(ref, () => instance);
    return null;
  }

  return /*#__PURE__*/react.forwardRef(LeafComponent);
}

function useEventHandlers(element, eventHandlers) {
  const eventHandlersRef = react.useRef();
  react.useEffect(function addEventHandlers() {
    if (eventHandlers != null) {
      element.instance.on(eventHandlers);
    }

    eventHandlersRef.current = eventHandlers;
    return function removeEventHandlers() {
      if (eventHandlersRef.current != null) {
        element.instance.off(eventHandlersRef.current);
      }

      eventHandlersRef.current = null;
    };
  }, [element, eventHandlers]);
}

function withPane(props, context) {
  var _props$pane;

  const pane = (_props$pane = props.pane) != null ? _props$pane : context.pane;
  return pane ? { ...props,
    pane
  } : props;
}

function createDivOverlayHook(useElement, useLifecycle) {
  return function useDivOverlay(props, setOpen) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLifecycle(elementRef.current, context, props, setOpen);
    return elementRef;
  };
}

function createElementHook(createElement, updateElement) {
  if (updateElement == null) {
    return function useImmutableLeafletElement(props, context) {
      return react.useRef(createElement(props, context));
    };
  }

  return function useMutableLeafletElement(props, context) {
    const elementRef = react.useRef(createElement(props, context));
    const propsRef = react.useRef(props);
    const {
      instance
    } = elementRef.current;
    react.useEffect(function updateElementProps() {
      if (propsRef.current !== props) {
        updateElement(instance, props, propsRef.current);
        propsRef.current = props;
      }
    }, [instance, props, context]);
    return elementRef;
  };
}

function useLayerLifecycle(element, context) {
  react.useEffect(function addLayer() {
    var _context$layerContain;

    const container = (_context$layerContain = context.layerContainer) != null ? _context$layerContain : context.map;
    container.addLayer(element.instance);
    return function removeLayer() {
      container.removeLayer(element.instance);
    };
  }, [context, element]);
}
function createLayerHook(useElement) {
  return function useLayer(props) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLayerLifecycle(elementRef.current, context);
    return elementRef;
  };
}

function createLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createContainerComponent(useLayer);
}
function createOverlayComponent(createElement, useLifecycle) {
  const useElement = createElementHook(createElement);
  const useOverlay = createDivOverlayHook(useElement, useLifecycle);
  return createDivOverlayComponent(useOverlay);
}
function createTileLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createLeafComponent(useLayer);
}

function updateGridLayer(layer, props, prevProps) {
  const {
    opacity,
    zIndex
  } = props;

  if (opacity != null && opacity !== prevProps.opacity) {
    layer.setOpacity(opacity);
  }

  if (zIndex != null && zIndex !== prevProps.zIndex) {
    layer.setZIndex(zIndex);
  }
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function useMapElement(mapRef, props) {
  const [map, setMap] = react.useState(null);
  react.useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new leafletSrc.Map(mapRef.current, props);

      if (props.center != null && props.zoom != null) {
        instance.setView(props.center, props.zoom);
      } else if (props.bounds != null) {
        instance.fitBounds(props.bounds, props.boundsOptions);
      }

      if (props.whenReady != null) {
        instance.whenReady(props.whenReady);
      }

      setMap(instance);
    }
  }, [mapRef, map, props]);
  return map;
}
function MapContainer({
  children,
  className,
  id,
  placeholder,
  style,
  whenCreated,
  ...options
}) {
  const mapRef = react.useRef(null);
  const map = useMapElement(mapRef, options);
  const createdRef = react.useRef(false);
  react.useEffect(() => {
    if (map != null && createdRef.current === false && whenCreated != null) {
      createdRef.current = true;
      whenCreated(map);
    }
  }, [map, whenCreated]);
  const [props] = react.useState({
    className,
    id,
    style
  });
  const context = react.useMemo(() => map ? {
    __version: CONTEXT_VERSION,
    map
  } : null, [map]);
  const contents = context ? /*#__PURE__*/react.createElement(LeafletProvider, {
    value: context
  }, children) : placeholder != null ? placeholder : null;
  return /*#__PURE__*/react.createElement("div", _extends({}, props, {
    ref: mapRef
  }), contents);
}

const Marker = createLayerComponent(function createMarker({
  position,
  ...options
}, ctx) {
  const instance = new leafletSrc.Marker(position, options);
  return {
    instance,
    context: { ...ctx,
      overlayContainer: instance
    }
  };
}, function updateMarker(marker, props, prevProps) {
  if (props.position !== prevProps.position) {
    marker.setLatLng(props.position);
  }

  if (props.icon != null && props.icon !== prevProps.icon) {
    marker.setIcon(props.icon);
  }

  if (props.zIndexOffset != null && props.zIndexOffset !== prevProps.zIndexOffset) {
    marker.setZIndexOffset(props.zIndexOffset);
  }

  if (props.opacity != null && props.opacity !== prevProps.opacity) {
    marker.setOpacity(props.opacity);
  }

  if (marker.dragging != null && props.draggable !== prevProps.draggable) {
    if (props.draggable === true) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }
});

const Popup = createOverlayComponent(function createPopup(props, context) {
  return {
    instance: new leafletSrc.Popup(props, context.overlayContainer),
    context
  };
}, function usePopupLifecycle(element, context, props, setOpen) {
  const {
    onClose,
    onOpen,
    position
  } = props;
  react.useEffect(function addPopup() {
    const {
      instance
    } = element;

    function onPopupOpen(event) {
      if (event.popup === instance) {
        instance.update();
        setOpen(true);
        onOpen == null ? void 0 : onOpen();
      }
    }

    function onPopupClose(event) {
      if (event.popup === instance) {
        setOpen(false);
        onClose == null ? void 0 : onClose();
      }
    }

    context.map.on({
      popupopen: onPopupOpen,
      popupclose: onPopupClose
    });

    if (context.overlayContainer == null) {
      // Attach to a Map
      if (position != null) {
        instance.setLatLng(position);
      }

      instance.openOn(context.map);
    } else {
      // Attach to container component
      context.overlayContainer.bindPopup(instance);
    }

    return function removePopup() {
      context.map.off({
        popupopen: onPopupOpen,
        popupclose: onPopupClose
      });

      if (context.overlayContainer == null) {
        context.map.removeLayer(instance);
      } else {
        context.overlayContainer.unbindPopup();
      }
    };
  }, [element, context, setOpen, onClose, onOpen, position]);
});

const TileLayer = createTileLayerComponent(function createTileLayer({
  url,
  ...options
}, context) {
  return {
    instance: new leafletSrc.TileLayer(url, withPane(options, context)),
    context
  };
}, updateGridLayer);

export { MapContainer, Marker, Popup, TileLayer };
