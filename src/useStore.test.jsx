import { renderHook, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { useStore } from './useStore';
import { act } from '@testing-library/react';

test('useStore hook renders', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual('');
    expect(result.current.products).toEqual([]);
})

test('useStore successfully get data', async () => {
    let mockedProducts = [
        {
            id: 1,
            title: 'p1',
            price: 0.1,
            description: 'd1',
            category: 'c1',
            image: 'i1',
        },
        {
            id: 2,
            title: 'p2',
            price: 0.2,
            description: 'd2',
            category: 'c2',
            image: 'i2',
        }
    ]

    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockedProducts),
        }),
    );
    const { result } = renderHook(() => useStore());
    await waitFor(() => expect(result.current.products).toHaveLength(2));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual('');
})

test('useStore can update state', () => {
    let mockedProducts = [
        {
            id: 1,
            title: 'p1',
            price: 0.1,
            description: 'd1',
            category: 'c1',
            image: 'i1',
        },
        {
            id: 2,
            title: 'p2',
            price: 0.2,
            description: 'd2',
            category: 'c2',
            image: 'i2',
        }
    ]

    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockedProducts),
        }),
    );
    
    const { result } = renderHook(() => useStore());
    act(() => result.current.updateItemCnt(1)(69));
    expect(result.current.cart.get(1)).toBe(69);
    
    act(() => result.current.incrementItemCnt(2)());
    expect(result.current.cart.get(2)).toBe(1);

    act(() => result.current.decrementItemCnt(2)());
    expect(result.current.cart.has(2)).toBe(false);
})