import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col bg-red-200 p-4 rounded-xl gap-2">
            <h1 className="text-lg font-medium">Oops! Something went wrong.</h1>
            <p className="text-sm ">
              We&apos;re sorry for the inconvenience. Please try refreshing the page or contact
              support if the problem persists.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;
