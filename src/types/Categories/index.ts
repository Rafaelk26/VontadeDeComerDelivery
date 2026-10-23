export type Category = {
    id: string;
    name: string;
    color?: string;
}

export type NewCategory = Omit<Category, "id">;