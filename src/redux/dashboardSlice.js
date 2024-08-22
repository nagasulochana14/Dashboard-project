import { createSlice } from "@reduxjs/toolkit";
import initialData from "../dashboardData.json";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: initialData,
    visibleWidgets: initialData.categories.reduce((acc, category) => {
      acc[category.id] = category.widgets.map((widget) => widget.id);
      return acc;
    }, {}),
  },
  reducers: {
    toggleWidget: (state, action) => {
      const { widgetId, isChecked, selectedCategory } = action.payload;

      if (isChecked) {
        // Ensure widget is added only if not already present
        if (!state.visibleWidgets[selectedCategory].includes(widgetId)) {
          state.visibleWidgets[selectedCategory].push(widgetId);
        }
      } else {
        // Remove widget
        state.visibleWidgets[selectedCategory] = state.visibleWidgets[selectedCategory].filter(
          (id) => id !== widgetId
        );
      }
    },
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.data.categories.find(
        (category) => category.id === categoryId
      );
      if (category) {
        category.widgets.push(widget);
        state.visibleWidgets[categoryId].push(widget.id);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const updatedCategories = state.data.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      );

      state.data = { ...state.data, categories: updatedCategories };
    },
    resetDashboard: (state) => {
      state.data = initialData;
      state.visibleWidgets = initialData.categories.reduce((acc, category) => {
        acc[category.id] = category.widgets.map((widget) => widget.id);
        return acc;
      }, {});
    },
  },
});

export const { toggleWidget, addWidget, resetDashboard, removeWidget } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
