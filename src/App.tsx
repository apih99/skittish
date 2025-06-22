import React, { useState, useEffect, useRef } from 'react';
import { 
  Mouse, 
  Heart, 
  Star, 
  Zap, 
  Sparkles, 
  Ghost, 
  Skull, 
  Smile,
  Coffee,
  Music
} from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface SkittishElement {
  id: string;
  position: Position;
  targetPosition: Position;
  velocity: Position;
  size: number;
  type: 'text' | 'button' | 'icon';
  content: string;
  icon?: React.ReactElement;
  isJiggling: boolean;
  fearLevel: number;
}

function App() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [elements, setElements] = useState<SkittishElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Initialize skittish elements
  useEffect(() => {
    const initialElements: SkittishElement[] = [
      {
        id: 'welcome',
        position: { x: 400, y: 200 },
        targetPosition: { x: 400, y: 200 },
        velocity: { x: 0, y: 0 },
        size: 60,
        type: 'text',
        content: 'Welcome to the Skittish Site!',
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'subtitle',
        position: { x: 300, y: 280 },
        targetPosition: { x: 300, y: 280 },
        velocity: { x: 0, y: 0 },
        size: 40,
        type: 'text',
        content: 'Everything here is afraid of you...',
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'button1',
        position: { x: 200, y: 400 },
        targetPosition: { x: 200, y: 400 },
        velocity: { x: 0, y: 0 },
        size: 50,
        type: 'button',
        content: 'Click Me (If You Can)',
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'button2',
        position: { x: 600, y: 450 },
        targetPosition: { x: 600, y: 450 },
        velocity: { x: 0, y: 0 },
        size: 50,
        type: 'button',
        content: 'I Run Away!',
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'icon1',
        position: { x: 150, y: 300 },
        targetPosition: { x: 150, y: 300 },
        velocity: { x: 0, y: 0 },
        size: 40,
        type: 'icon',
        content: 'heart',
        icon: <Heart className="w-8 h-8" />,
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'icon2',
        position: { x: 700, y: 250 },
        targetPosition: { x: 700, y: 250 },
        velocity: { x: 0, y: 0 },
        size: 40,
        type: 'icon',
        content: 'star',
        icon: <Star className="w-8 h-8" />,
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'icon3',
        position: { x: 500, y: 350 },
        targetPosition: { x: 500, y: 350 },
        velocity: { x: 0, y: 0 },
        size: 40,
        type: 'icon',
        content: 'zap',
        icon: <Zap className="w-8 h-8" />,
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'icon4',
        position: { x: 800, y: 400 },
        targetPosition: { x: 800, y: 400 },
        velocity: { x: 0, y: 0 },
        size: 40,
        type: 'icon',
        content: 'sparkles',
        icon: <Sparkles className="w-8 h-8" />,
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'icon5',
        position: { x: 100, y: 500 },
        targetPosition: { x: 100, y: 500 },
        velocity: { x: 0, y: 0 },
        size: 40,
        type: 'icon',
        content: 'ghost',
        icon: <Ghost className="w-8 h-8" />,
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'icon6',
        position: { x: 750, y: 150 },
        targetPosition: { x: 750, y: 150 },
        velocity: { x: 0, y: 0 },
        size: 40,
        type: 'icon',
        content: 'smile',
        icon: <Smile className="w-8 h-8" />,
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'text1',
        position: { x: 250, y: 150 },
        targetPosition: { x: 250, y: 150 },
        velocity: { x: 0, y: 0 },
        size: 30,
        type: 'text',
        content: 'Help! The cursor is coming!',
        isJiggling: false,
        fearLevel: 0
      },
      {
        id: 'text2',
        position: { x: 550, y: 500 },
        targetPosition: { x: 550, y: 500 },
        velocity: { x: 0, y: 0 },
        size: 30,
        type: 'text',
        content: 'This is terrifying!',
        isJiggling: false,
        fearLevel: 0
      }
    ];

    setElements(initialElements);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setElements(prevElements => 
        prevElements.map(element => {
          const dx = mousePosition.x - element.position.x;
          const dy = mousePosition.y - element.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Fear radius - closer mouse = more fear
          const fearRadius = element.type === 'icon' ? 150 : 
                           element.type === 'button' ? 200 : 180;
          
          let newElement = { ...element };
          
          if (distance < fearRadius && distance > 0) {
            // Calculate repulsion force
            const repulsionStrength = (fearRadius - distance) / fearRadius;
            const repulsionForce = repulsionStrength * 5;
            
            // Normalize direction vector
            const directionX = -dx / distance;
            const directionY = -dy / distance;
            
            // Apply repulsion
            newElement.velocity.x += directionX * repulsionForce;
            newElement.velocity.y += directionY * repulsionForce;
            
            // Set fear level and jiggling
            newElement.fearLevel = Math.min(repulsionStrength, 1);
            newElement.isJiggling = repulsionStrength > 0.5;
          } else {
            // Reduce fear when mouse is far away
            newElement.fearLevel = Math.max(0, newElement.fearLevel - 0.02);
            newElement.isJiggling = newElement.fearLevel > 0.3;
          }
          
          // Apply friction
          newElement.velocity.x *= 0.9;
          newElement.velocity.y *= 0.9;
          
          // Update position
          newElement.position.x += newElement.velocity.x;
          newElement.position.y += newElement.velocity.y;
          
          // Keep elements within bounds
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            newElement.position.x = Math.max(50, Math.min(rect.width - 50, newElement.position.x));
            newElement.position.y = Math.max(50, Math.min(rect.height - 50, newElement.position.y));
          }
          
          return newElement;
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  const renderElement = (element: SkittishElement) => {
    const jiggleIntensity = element.isJiggling ? 3 : 0;
    const jiggleX = element.isJiggling ? (Math.random() - 0.5) * jiggleIntensity : 0;
    const jiggleY = element.isJiggling ? (Math.random() - 0.5) * jiggleIntensity : 0;
    
    const style = {
      position: 'absolute' as const,
      left: element.position.x + jiggleX,
      top: element.position.y + jiggleY,
      transform: `translate(-50%, -50%) scale(${1 + element.fearLevel * 0.2})`,
      transition: element.isJiggling ? 'none' : 'transform 0.3s ease-out',
      pointerEvents: 'none' as const,
      zIndex: 10
    };

    const fearColor = element.fearLevel > 0.5 ? 'text-red-400' : 
                     element.fearLevel > 0.2 ? 'text-yellow-400' : 'text-white';

    if (element.type === 'text') {
      return (
        <div
          key={element.id}
          style={style}
          className={`${fearColor} font-bold text-center select-none transition-colors duration-300 ${
            element.content.includes('Welcome') ? 'text-4xl' :
            element.content.includes('afraid') ? 'text-2xl' : 'text-lg'
          }`}
        >
          {element.content}
        </div>
      );
    }

    if (element.type === 'button') {
      return (
        <button
          key={element.id}
          style={style}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            element.fearLevel > 0.5 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
              : element.fearLevel > 0.2
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black shadow-md'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
          }`}
        >
          {element.content}
        </button>
      );
    }

    if (element.type === 'icon') {
      return (
        <div
          key={element.id}
          style={style}
          className={`${fearColor} transition-colors duration-300 ${
            element.isJiggling ? 'animate-pulse' : ''
          }`}
        >
          {element.icon}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden relative cursor-crosshair"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
      </div>

      {/* Cursor position indicator */}
      <div
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-100"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      >
        <Mouse className="w-8 h-8 text-red-400 animate-pulse" />
      </div>

      {/* Render all skittish elements */}
      {elements.map(renderElement)}

      {/* Instructions */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/80 pointer-events-none">
        <p className="text-lg font-semibold mb-2">Move your mouse around to scare the elements!</p>
        <p className="text-sm">Watch them flee in terror 😱</p>
      </div>

      {/* Title overlay */}
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
          The Skittish Site
        </h1>
        <p className="text-xl text-white/90">Where everything runs away from you!</p>
      </div>
    </div>
  );
}

export default App;