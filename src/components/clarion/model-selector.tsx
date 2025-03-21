'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Image from 'next/image'
import { Model, models } from '@/types/models'
import { createModelId } from '@/lib/clarion/utils'
import { getCookie, setCookie } from '@/lib/clarion/utils/cookies'
import { useEffect, useState } from 'react'

function groupModelsByProvider(models: Model[]) {
  return models.reduce((groups, model) => {
    const provider = model.provider
    if (!groups[provider]) {
      groups[provider] = []
    }
    groups[provider].push(model)
    return groups
  }, {} as Record<string, Model[]>)
}

export function ModelSelector() {
  const [selectedModelId, setSelectedModelId] = useState<string>('')

  useEffect(() => {
    const savedModel = getCookie('selected-model')
    if (savedModel) {
      setSelectedModelId(savedModel)
    }
  }, [])

  const handleModelChange = (id: string) => {
    if (!id) return

    setCookie('selected-model', id)
    setSelectedModelId(id)
  }

  const groupedModels = groupModelsByProvider(models)

  return (
    <div className="absolute -top-8 left-2">
      <Select
        name="model"
        value={selectedModelId}
        onValueChange={handleModelChange}
      >
        <SelectTrigger className="mr-2 h-7 text-xs border-none shadow-none focus:ring-0">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {Object.entries(groupedModels).map(([provider, models]) => (
            <SelectGroup key={provider}>
              <SelectLabel className="text-xs sticky top-0 bg-background z-10">
                {provider}
              </SelectLabel>
              {models.map(model => (
                <SelectItem
                  key={createModelId(model)}
                  value={createModelId(model)}
                  className="py-2"
                >
                  <div className="flex items-center space-x-1">
                    <Image
                      src={`/providers/logos/${model.providerId}.svg`}
                      alt={model.provider}
                      width={18}
                      height={18}
                      className="bg-white rounded-full border"
                    />
                    <span className="text-xs font-medium">{model.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
  }
