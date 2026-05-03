<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Histórico de Produto - {{ $product->name }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eab308; padding-bottom: 10px; }
        .product-info { margin-bottom: 20px; }
        .product-info table { width: 100%; border-collapse: collapse; }
        .product-info td { padding: 5px; }
        .label { font-weight: bold; color: #666; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f8fafc; color: #475569; font-size: 10px; text-transform: uppercase; }
        .badge { padding: 3px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; }
        .sale { background-color: #e0e7ff; color: #4338ca; }
        .addition { background-color: #dcfce7; color: #15803d; }
        .removal { background-color: #fee2e2; color: #b91c1c; }
        .adjustment { background-color: #fef9c3; color: #a16207; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #999; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Relatório de Histórico de Produto</h1>
        <p>Gerado em: {{ now()->format('d/m/Y H:i') }}</p>
    </div>

    <div class="product-info">
        <table>
            <tr>
                <td class="label">Produto:</td>
                <td>{{ $product->name }}</td>
                <td class="label">SKU:</td>
                <td>{{ $product->sku ?: 'N/A' }}</td>
            </tr>
            <tr>
                <td class="label">Categoria:</td>
                <td>{{ $product->category->name }}</td>
                <td class="label">Estoque Atual:</td>
                <td>{{ $product->stock }} un</td>
            </tr>
            <tr>
                <td class="label">Preço:</td>
                <td>R$ {{ number_format($product->price, 2, ',', '.') }}</td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Quant.</th>
                <th>Estoque</th>
                <th>Descrição</th>
                <th>Usuário</th>
            </tr>
        </thead>
        <tbody>
            @foreach($movements as $m)
            <tr>
                <td>{{ $m->created_at->format('d/m/Y H:i') }}</td>
                <td>
                    <span class="badge {{ $m->type }}">
                        {{ [
                            'sale' => 'VENDA',
                            'addition' => 'ENTRADA',
                            'removal' => 'SAÍDA',
                            'adjustment' => 'AJUSTE'
                        ][$m->type] }}
                    </span>
                </td>
                <td>{{ $m->type == 'addition' ? '+' : '-' }}{{ $m->quantity }}</td>
                <td>{{ $m->old_stock }} &rarr; {{ $m->new_stock }}</td>
                <td>{{ $m->description }}</td>
                <td>{{ $m->user ? $m->user->name : 'Sistema' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Podóloga Rodrigues - Relatório Interno
    </div>
</body>
</html>
