import { create } from 'zustand';

// Types
export interface StockItem {
  id: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  icon: string;
  photoUri?: string | null;
}

export interface BatchItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  cost: number;
  selling: number;
  photoUri?: string | null;
}

export interface Batch {
  id: string;
  date: string;
  status: 'Paid' | 'Unpaid';
  totalAmount: number;
  items: BatchItem[];
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  totalPayable: number;
  isExpanded: boolean;
  batches: Batch[];
}

interface InventoryState {
  stock: StockItem[];
  suppliers: Supplier[];
  
  // Actions
  toggleSupplierExpand: (id: string) => void;
  enrollSupplierAndBatch: (vendorName: string, category: string, items: Omit<BatchItem, 'id'>[]) => void;
  addBatchToSupplier: (supplierId: string, items: Omit<BatchItem, 'id'>[]) => void;
  processRefund: (supplierId: string, batchId: string, refunds: { id: string, refundQty: number }[]) => void;
  updateSellingPrice: (itemId: string, newPrice: number) => void;
}

// Initial Data
const INITIAL_STOCK: StockItem[] = [
  { id: 's1', name: 'Sunflower Cooking Oil (1L)', category: 'Cooking Oil & Fats', costPrice: 320, sellingPrice: 370, stock: 450, icon: 'water-outline' },
  { id: 's2', name: 'Wheat Flour (5kg)', category: 'Flour & Baking', costPrice: 700, sellingPrice: 850, stock: 12, icon: 'bag-outline' },
  { id: 's3', name: 'Premium Dark Chocolate', category: 'Confectionery', costPrice: 150, sellingPrice: 200, stock: 85, icon: 'grid-outline' },
];

const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup1',
    name: 'Oromia Oil Mills',
    category: 'Cooking Oil & Fats',
    totalPayable: 85000,
    isExpanded: true,
    batches: [
      {
        id: 'BATCH-114',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: 'Unpaid',
        totalAmount: 45000,
        items: [
          { id: 'b_i1', name: 'Sunflower Cooking Oil (1L)', category: 'Cooking Oil & Fats', qty: 100, cost: 320, selling: 370 },
        ]
      }
    ]
  }
];

// Helper to update global stock based on incoming batch items
const syncStockWithBatch = (currentStock: StockItem[], batchItems: BatchItem[]) => {
  let updatedStock = [...currentStock];

  batchItems.forEach(batchItem => {
    const existingIndex = updatedStock.findIndex(s => s.name.toLowerCase() === batchItem.name.toLowerCase());
    
    if (existingIndex >= 0) {
      // Increment existing stock
      updatedStock[existingIndex].stock += batchItem.qty;
      // Update cost/selling price to the latest batch prices
      updatedStock[existingIndex].costPrice = batchItem.cost;
      updatedStock[existingIndex].sellingPrice = batchItem.selling;
    } else {
      // Create entirely new catalog item
      updatedStock.push({
        id: `s_${Date.now()}_${Math.random()}`,
        name: batchItem.name,
        category: batchItem.category || 'General',
        costPrice: batchItem.cost,
        sellingPrice: batchItem.selling,
        stock: batchItem.qty,
        icon: 'cube-outline', 
        photoUri: batchItem.photoUri,
      });
    }
  });

  return updatedStock;
};

export const useInventoryStore = create<InventoryState>((set) => ({
  stock: INITIAL_STOCK,
  suppliers: INITIAL_SUPPLIERS,

  toggleSupplierExpand: (id) => set((state) => ({
    suppliers: state.suppliers.map(s => 
      s.id === id ? { ...s, isExpanded: !s.isExpanded } : s
    )
  })),

  enrollSupplierAndBatch: (vendorName, category, itemsInput) => set((state) => {
    const itemsWithIds = itemsInput.map((item, idx) => ({ ...item, id: `item_${Date.now()}_${idx}` }));
    const batchTotal = itemsWithIds.reduce((sum, item) => sum + (item.qty * item.cost), 0);
    
    const newBatch: Batch = {
      id: `BATCH-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Unpaid',
      totalAmount: batchTotal,
      items: itemsWithIds,
    };

    const newSupplier: Supplier = {
      id: `sup_${Date.now()}`,
      name: vendorName,
      category: category,
      totalPayable: batchTotal,
      isExpanded: true,
      batches: [newBatch],
    };

    return {
      suppliers: [newSupplier, ...state.suppliers],
      stock: syncStockWithBatch(state.stock, itemsWithIds)
    };
  }),

  addBatchToSupplier: (supplierId, itemsInput) => set((state) => {
    const itemsWithIds = itemsInput.map((item, idx) => ({ ...item, id: `item_${Date.now()}_${idx}` }));
    const batchTotal = itemsWithIds.reduce((sum, item) => sum + (item.qty * item.cost), 0);
    
    const newBatch: Batch = {
      id: `BATCH-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Unpaid',
      totalAmount: batchTotal,
      items: itemsWithIds,
    };

    return {
      suppliers: state.suppliers.map(sup => {
        if (sup.id === supplierId) {
          return {
            ...sup,
            totalPayable: sup.totalPayable + batchTotal,
            batches: [newBatch, ...sup.batches],
            isExpanded: true,
          };
        }
        return sup;
      }),
      stock: syncStockWithBatch(state.stock, itemsWithIds)
    };
  }),

  processRefund: (supplierId, batchId, refunds) => set((state) => {
    let refundValueTotal = 0;
    let itemsToDeductFromStock: { name: string, deductQty: number }[] = [];

    // 1. Update the supplier's batch and calculate refund money
    const updatedSuppliers = state.suppliers.map(sup => {
      if (sup.id !== supplierId) return sup;

      const updatedBatches = sup.batches.map(batch => {
        if (batch.id !== batchId) return batch;

        const updatedItems = batch.items.map(item => {
          const refundReq = refunds.find(r => r.id === item.id);
          if (refundReq && refundReq.refundQty > 0) {
            const actualRefundQty = Math.min(item.qty, refundReq.refundQty); // Prevent refunding more than existed
            refundValueTotal += (actualRefundQty * item.cost);
            itemsToDeductFromStock.push({ name: item.name, deductQty: actualRefundQty });
            
            return { ...item, qty: item.qty - actualRefundQty };
          }
          return item;
        });

        return {
          ...batch,
          totalAmount: Math.max(0, batch.totalAmount - refundValueTotal),
          items: updatedItems
        };
      });

      return {
        ...sup,
        totalPayable: Math.max(0, sup.totalPayable - refundValueTotal),
        batches: updatedBatches
      };
    });

    // 2. Safely deduct the items from the global stock catalog
    const updatedStock = [...state.stock];
    itemsToDeductFromStock.forEach(deduction => {
      const stockIndex = updatedStock.findIndex(s => s.name.toLowerCase() === deduction.name.toLowerCase());
      if (stockIndex >= 0) {
        updatedStock[stockIndex].stock = Math.max(0, updatedStock[stockIndex].stock - deduction.deductQty);
      }
    });

    return {
      suppliers: updatedSuppliers,
      stock: updatedStock
    };
  }),

  updateSellingPrice: (itemId, newPrice) => set((state) => ({
    stock: state.stock.map(item => 
      item.id === itemId ? { ...item, sellingPrice: newPrice } : item
    )
  })),

}));