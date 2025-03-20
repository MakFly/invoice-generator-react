import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type Step = {
  icon: LucideIcon;
  title: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
};

const StepIndicator: React.FC<Props> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.title}
            className={`flex items-center ${
              index !== steps.length - 1 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div
              className={`ml-3 ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step.title}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;