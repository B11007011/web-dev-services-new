import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { PageUpdateInput } from '@/types/api'

interface RouteParams {
  params: { slug: string }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: params.slug }
    })

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Error fetching page' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json() as PageUpdateInput
    
    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { slug: params.slug }
    })

    if (!existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // Clean and validate input
    const updates: PageUpdateInput = {}
    if (body.title) updates.title = body.title.trim()
    if (body.content) updates.content = body.content.trim()
    if (body.locale) updates.locale = body.locale.toLowerCase()

    const updatedPage = await prisma.page.update({
      where: { slug: params.slug },
      data: updates
    })

    return NextResponse.json({
      message: 'Page updated successfully',
      page: updatedPage
    })
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json(
      { error: 'Error updating page' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { slug: params.slug }
    })

    if (!existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    await prisma.page.delete({
      where: { slug: params.slug }
    })

    return NextResponse.json({
      message: 'Page deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json(
      { error: 'Error deleting page' },
      { status: 500 }
    )
  }
} 