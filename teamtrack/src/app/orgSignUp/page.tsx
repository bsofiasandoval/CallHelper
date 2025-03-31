'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { NavigationBar } from "@/components/navigationBar"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "Nombre debe tener al menos 2 caracteres.",
    }),
    apellido: z.string().min(2, {
        message: "Apellido debe tener al menos 2 caracteres.",
    }),
    orgName: z.string().min(2, {
        message: "Nombre de la Organización debe tener al menos 2 caracteres.",
    }),
    orgEmail: z.string().email({
        message: "Correo de la Organización debe ser un correo válido.",
    }),
    orgPassword: z.string().min(8, {
        message: "Contraseña debe tener al menos 8 caracteres.",
    }),
})

export default function OrgSignUp() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            orgName: "",
            orgEmail: "",
            orgPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch("https://127.0.0.1:5000/organizations/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    org_name: values.orgName,
                    domain: values.orgEmail.split("@")[1],
                    first_name: values.nombre,
                    last_name: values.apellido,
                    email: values.orgEmail,
                    password: values.orgPassword, // aún si no se usa, lo mandamos por si después lo necesitas
                }),
            });

            const result = await res.json();

            if (res.ok) {
                alert("Organización registrada exitosamente ✅");
                form.reset(); // limpiar formulario
                // Puedes redirigir al login o dashboard si quieres
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (err) {
            console.error("Error creando organización:", err);
            alert("Error inesperado al registrar la organización.");
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <NavigationBar />

            <div className="grid min-h-svh lg:grid-cols-2 bg-white">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <br />
                            <br />
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-3xl font-bold pb-6">Registro de Organización</h1>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="nombre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="María" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="apellido"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apellido</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="López" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="orgName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Organización</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Teamtrack" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="orgEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo Electrónico</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="nombre@organizacion.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="orgPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contraseña</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <Button type="submit">Crear Organización</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-muted lg:block">
                    <img
                        src="/Gradient.png"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover scale-120 dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </div>
    )
}
