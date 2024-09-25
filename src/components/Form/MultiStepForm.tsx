/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Box, Button, Flex, Progress } from '@chakra-ui/react';
import { FormikProps } from 'formik';

interface Step {
    component: React.ComponentType<{
        onSubmit: (values: Record<string, any>) => void;
        data: Record<string, any>;
        formikProps?: FormikProps<Record<string, any>>;
    }>;
}

interface MultiStepFormProps {
    steps: Step[];
    onSubmit: (values: Record<string, any>) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleNext = (stepData: Record<string, any>) => {
        setFormData({ ...formData, ...stepData });
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onSubmit({ ...formData, ...stepData });
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const CurrentStepComponent = steps[currentStep]?.component;

    return (
        <Box>
            <Progress value={(currentStep / (steps.length - 1)) * 100} mb={4} />
            {CurrentStepComponent && (
                <CurrentStepComponent onSubmit={handleNext} data={formData} />
            )}
            <Flex justifyContent="space-between" mt={4}>
                {currentStep > 0 && (
                    <Button onClick={handleBack}>Back</Button>
                )}
                {currentStep < steps.length - 1 && (
                    <Button colorScheme="yellow" type="submit" form={`form-step-${currentStep}`}>
                        Next
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button colorScheme="yellow" type="submit" form={`form-step-${currentStep}`}>
                        Submit
                    </Button>
                )}
            </Flex>
        </Box>
    );
};

export default MultiStepForm;