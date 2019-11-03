import React, {Component, ComponentType} from 'react';

export interface WithValidationProps {
  validate?: (value?: string | number) => void | Promise<void>;
  value?: string | number;
}

export interface WithValidationState {
  isPending: boolean;
  isValid: boolean;
  isTouched: boolean;
  error?: Error;
}

export interface WithValidationInputProps {
  isValid: boolean;
  isPending: boolean;
  errorMessage?: string; 
}

export const withValidation = <InputProps extends {value?: number | string}>(
  Wrapped: ComponentType<InputProps & WithValidationInputProps>
) => {
  return class WithValidation extends Component<
    WithValidationProps & InputProps, 
    WithValidationState
  > {
    constructor(props: WithValidationProps & InputProps) {
      super(props);

      this.state = {
        isValid: true,
        isTouched: false,
        isPending: false,
        error: undefined,
      }
    }

    validateValue = async () => {
      const {value, validate} = this.props;
      const {isValid, isPending, isTouched} = this.state;

      if (!validate) return;

      try {
        const result = validate(value);

        if (result instanceof Promise) {

          this.setState({
            isPending: true,
          });

          await result;
        }

        if (isValid) return;

        this.setState({
          isValid: true,
          error: undefined,
        });

      } catch (err) {
        if (!isValid) return;

        this.setState({
          error: err,
          isValid: false,
        })
      }
    }

    render() {
      const {
        validate,
        ...props
      } = this.props;

      const {
        isPending,
        isValid,
        isTouched,
        error,
      } = this.state;

      return (
        <Wrapped 
          {...props as InputProps}
          isPending={isPending}
          isValid={isValid || !isTouched}
          errorMessage={error && error.message}
        />
      )
    }
  }
}