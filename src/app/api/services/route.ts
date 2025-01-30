import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const services = await prisma.service.findMany()
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching services' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        features: body.features,
        locale: body.locale,
      },
    })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating service' }, { status: 500 })
  }
} 