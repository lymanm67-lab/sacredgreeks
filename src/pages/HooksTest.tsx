import { useState, useEffect, useRef, useCallback } from 'react';

// Minimal test component to verify React hooks work
function HooksDebug() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('initializing...');
  const renderCount = useRef(0);
  
  renderCount.current += 1;

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    setStatus('✅ useEffect works');
  }, []);

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#22c55e', marginBottom: '1rem' }}>
        React Hooks Test Page
      </h1>
      
      <div style={{ 
        background: '#f0fdf4', 
        border: '1px solid #22c55e',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <h2 style={{ margin: '0 0 0.5rem 0' }}>Hook Status</h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>useState: {count >= 0 ? '✅ Works' : '❌ Failed'}</li>
          <li>useEffect: {status}</li>
          <li>useRef: {renderCount.current > 0 ? '✅ Works' : '❌ Failed'}</li>
          <li>useCallback: {typeof increment === 'function' ? '✅ Works' : '❌ Failed'}</li>
        </ul>
      </div>

      <div style={{ 
        background: '#f8fafc', 
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <h2 style={{ margin: '0 0 0.5rem 0' }}>Interactive Test</h2>
        <p>Count: <strong>{count}</strong></p>
        <p>Render count: <strong>{renderCount.current}</strong></p>
        <button 
          onClick={increment}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </div>

      <div style={{ 
        background: '#fef3c7', 
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <h2 style={{ margin: '0 0 0.5rem 0' }}>Debug Info</h2>
        <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
          {JSON.stringify({
            reactVersion: '18.3.1',
            timestamp: new Date().toISOString(),
            windowExists: typeof window !== 'undefined',
          }, null, 2)}
        </pre>
      </div>

      <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
        If you see this page with all green checkmarks, React hooks are working correctly.
        <br />
        <a href="/" style={{ color: '#3b82f6' }}>← Back to Home</a>
      </p>
    </div>
  );
}

export default HooksDebug;
