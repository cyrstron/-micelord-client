export interface RootState {
  readonly someProp: string;
}

const initialState: RootState = {
  someProp: 'string',
};

export const rootReducer = (state: RootState = initialState, action: {type: string} ): RootState => {
  const {type} = action;
  switch (type) {
    default:
      return state;
  }
};
