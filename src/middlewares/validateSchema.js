export function validateSchema(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            const errors = result.error.flatten().fieldErrors;
            const message = Object.values(errors)[0]?.[0] || "Dados inválidos";

            const statusCode = 422;

            return res.status(statusCode).json({ message })
        }

        req.body = result.data;
        next();
    };
}
