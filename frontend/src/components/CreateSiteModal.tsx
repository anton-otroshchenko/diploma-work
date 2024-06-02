import {
    Button,
    FormControl, FormErrorMessage,
    FormLabel, Input, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Select
} from "@chakra-ui/react";
import {Field, FieldInputProps, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {useAppSelector} from "../hooks/hooks.ts";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
}

const CreateSiteModal: React.FC<Props> = ({
                                            isOpen,
                                            handleClose
                                          }) => {

    const user = useAppSelector(user=>user.user.currentUser);
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Input your preferences</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={{ name: '', toneOfVoice: 'Official', industry: '', targetAudience: 'Kids' }}
                        onSubmit={async (values: { name: string, toneOfVoice: string, industry: string, targetAudience: string }, actions: FormikHelpers<{ name: string, toneOfVoice: string, industry: string, targetAudience: string }>) => {
                            console.log(values);
                            const result = await fetch('http://localhost:3000/sites', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    ...values,
                                    userId: user.id
                                }), // Correctly serialize the body to JSON
                            });
                            const site = await result.json();
                            window.location.href = `/${site.id}`;
                            actions.setSubmitting(false); // Stop the loading indicator
                        }}
                    >
                        {(props: FormikProps<{ name: string, toneOfVoice: string, industry: string, targetAudience: string }>) => (
                            <Form>
                                <Field name='name'>
                                    {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ name: string }> }) => (
                                        <FormControl mb={5} isInvalid={Boolean(form.errors.name && form.touched.name)}>
                                            <FormLabel>Name</FormLabel>
                                            <Input {...field} placeholder='Input the website name' />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field pb={10} name='industry'>
                                    {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ industry: string }> }) => (
                                        <FormControl mb={5} isInvalid={Boolean(form.errors.industry && form.touched.industry)}>
                                            <FormLabel>Website industry</FormLabel>
                                            <Input {...field} placeholder='Input the website industry' />
                                            <FormErrorMessage>{form.errors.industry}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field pb={10} name='toneOfVoice'>
                                    {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ toneOfVoice: string }> }) => (
                                        <FormControl mb={5} isInvalid={Boolean(form.errors.toneOfVoice && form.touched.toneOfVoice)}>
                                            <FormLabel>Tone of voice</FormLabel>
                                            <Select {...field} >
                                                <option>Official</option>
                                                <option>Non-official</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.toneOfVoice}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field pb={10} name='targetAudience'>
                                    {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<{ targetAudience: string }> }) => (
                                        <FormControl mb={5} isInvalid={Boolean(form.errors.targetAudience && form.touched.targetAudience)}>
                                            <FormLabel>Target audience</FormLabel>
                                            <Select {...field} >
                                                <option>Kids</option>
                                                <option>Teenager</option>
                                                <option>Young adult</option>
                                                <option>Adult</option>
                                                <option>Elderly</option>
                                            </Select>
                                            <FormErrorMessage>{form.errors.targetAudience}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Generate
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export { CreateSiteModal };