
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  section: string;
  description: string;
  images: string[];
  createdAt: string;
  status: "Ativo" | "Inativo" | "Promocão";
};

// Dados de exemplo
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Biquíni Tropical Paradise",
    price: "R$ 149,90",
    category: "Biquínis",
    section: "verao2025",
    description: "Biquíni estampado com detalhes em dourado",
    images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300"],
    createdAt: "2024-06-01",
    status: "Ativo",
  },
  {
    id: "2",
    name: "Maiô Elegance",
    price: "R$ 189,90",
    category: "Maiôs",
    section: "promocoes",
    description: "Maiô com recortes laterais elegantes",
    images: ["https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300"],
    createdAt: "2024-05-22",
    status: "Promocão",
  },
  {
    id: "3",
    name: "Biquíni Summer Vibes",
    price: "R$ 129,90",
    category: "Biquínis",
    section: "maisVendidos",
    description: "Biquíni tie-dye com amarrações",
    images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300"],
    createdAt: "2024-06-05",
    status: "Ativo",
  },
];

const allColumns = [
  "Produto",
  "Preço",
  "Categoria",
  "Seção",
  "Descrição",
  "Imagem",
  "Status",
  "Criado em",
  "Ações",
] as const;

const sections = {
  verao2025: "Coleção Verão 2025",
  promocoes: "Promoções",
  maisVendidos: "Mais Vendidos",
};

function ProductTable() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([...allColumns]);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  const filteredData = mockProducts.filter((product) => {
    return (
      (!nameFilter || product.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (!categoryFilter || product.category.toLowerCase().includes(categoryFilter.toLowerCase())) &&
      (!priceFilter || product.price.toLowerCase().includes(priceFilter.toLowerCase())) &&
      (!sectionFilter || product.section.toLowerCase().includes(sectionFilter.toLowerCase()))
    );
  });

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col)
        ? prev.filter((c) => c !== col)
        : [...prev, col]
    );
  };

  return (
    <div className="container mx-auto my-10 space-y-4 p-4 border border-border rounded-lg bg-background shadow-sm overflow-x-auto">
      {/* Header com botão de cadastro */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gradient">Produtos Cadastrados</h2>
        <Link to="/cadastro-produto">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Cadastrar Produto
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Filtrar por nome..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-48"
          />
          <Input
            placeholder="Filtrar por categoria..."
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-48"
          />
          <Input
            placeholder="Filtrar por preço..."
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-48"
          />
          <Input
            placeholder="Filtrar por seção..."
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="w-48"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-background z-50">
            {allColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col}
                checked={visibleColumns.includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              >
                {col}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {visibleColumns.includes("Produto") && <TableHead className="w-[200px]">Produto</TableHead>}
            {visibleColumns.includes("Preço") && <TableHead className="w-[120px]">Preço</TableHead>}
            {visibleColumns.includes("Categoria") && <TableHead className="w-[120px]">Categoria</TableHead>}
            {visibleColumns.includes("Seção") && <TableHead className="w-[150px]">Seção</TableHead>}
            {visibleColumns.includes("Descrição") && <TableHead className="w-[250px]">Descrição</TableHead>}
            {visibleColumns.includes("Imagem") && <TableHead className="w-[100px]">Imagem</TableHead>}
            {visibleColumns.includes("Status") && <TableHead className="w-[100px]">Status</TableHead>}
            {visibleColumns.includes("Criado em") && <TableHead className="w-[120px]">Criado em</TableHead>}
            {visibleColumns.includes("Ações") && <TableHead className="w-[100px]">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length ? (
            filteredData.map((product) => (
              <TableRow key={product.id}>
                {visibleColumns.includes("Produto") && (
                  <TableCell className="font-medium">{product.name}</TableCell>
                )}
                {visibleColumns.includes("Preço") && (
                  <TableCell className="font-semibold text-primary">{product.price}</TableCell>
                )}
                {visibleColumns.includes("Categoria") && (
                  <TableCell>{product.category}</TableCell>
                )}
                {visibleColumns.includes("Seção") && (
                  <TableCell>{sections[product.section as keyof typeof sections]}</TableCell>
                )}
                {visibleColumns.includes("Descrição") && (
                  <TableCell className="max-w-[250px] truncate">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{product.description}</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] p-2">
                          <p>{product.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                )}
                {visibleColumns.includes("Imagem") && (
                  <TableCell>
                    {product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                    )}
                  </TableCell>
                )}
                {visibleColumns.includes("Status") && (
                  <TableCell>
                    <Badge
                      className={cn(
                        "whitespace-nowrap",
                        product.status === "Ativo" && "bg-green-500 text-white",
                        product.status === "Inativo" && "bg-gray-400 text-white",
                        product.status === "Promocão" && "bg-yellow-500 text-white",
                      )}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.includes("Criado em") && (
                  <TableCell className="whitespace-nowrap">{product.createdAt}</TableCell>
                )}
                {visibleColumns.includes("Ações") && (
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Visualizar produto</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={visibleColumns.length} className="text-center py-6">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;
