import React, { useState, useEffect } from 'react'
import { Search, X, Heart, Mail, Phone, Calendar, Users, ChevronRight } from 'lucide-react'
import { Input } from './components/shared/Input'

interface Member {
  id: number
  name: string
  birthday: string
  email: string
  phone: string
  generation: string
  spouse?: number
  parents?: number[]
  children?: number[]
}

const FamilyHeritage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Complete family database
  const familyMembers: Member[] = [
    // Grandparents
    {
      id: 1,
      name: 'James Wilson',
      birthday: 'March 15, 1945',
      email: 'james.wilson@email.com',
      phone: '+1 555-0101',
      generation: 'Grandparent',
      spouse: 2,
      children: [5]
    },
    {
      id: 2,
      name: 'Mary Wilson',
      birthday: 'June 22, 1948',
      email: 'mary.wilson@email.com',
      phone: '+1 555-0102',
      generation: 'Grandparent',
      spouse: 1,
      children: [5]
    },
    {
      id: 3,
      name: 'David Johnson',
      birthday: 'September 8, 1943',
      email: 'david.johnson@email.com',
      phone: '+1 555-0103',
      generation: 'Grandparent',
      spouse: 4,
      children: [6]
    },
    {
      id: 4,
      name: 'Patricia Johnson',
      birthday: 'December 12, 1946',
      email: 'patricia.johnson@email.com',
      phone: '+1 555-0104',
      generation: 'Grandparent',
      spouse: 3,
      children: [6]
    },
    {
      id: 10,
      name: 'José Martinez',
      birthday: 'May 3, 1968',
      email: 'jose.martinez@email.com',
      phone: '+1 555-0110',
      generation: 'Grandparent',
      spouse: 11,
      children: [8]
    },
    {
      id: 11,
      name: 'Maria Martinez',
      birthday: 'February 18, 1970',
      email: 'maria.martinez@email.com',
      phone: '+1 555-0111',
      generation: 'Grandparent',
      spouse: 10,
      children: [8]
    },
    // Parents
    {
      id: 5,
      name: 'Robert Wilson',
      birthday: 'April 10, 1970',
      email: 'robert.wilson@email.com',
      phone: '+1 555-0105',
      generation: 'Parent',
      spouse: 6,
      parents: [1, 2],
      children: [7, 9]
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      birthday: 'August 5, 1972',
      email: 'sarah.wilson@email.com',
      phone: '+1 555-0106',
      generation: 'Parent',
      spouse: 5,
      parents: [3, 4],
      children: [7, 9]
    },
    // Children
    {
      id: 7,
      name: 'Emily Martinez',
      birthday: 'January 20, 1995',
      email: 'emily.martinez@email.com',
      phone: '+1 555-0107',
      generation: 'Child',
      spouse: 8,
      parents: [5, 6],
      children: [12, 13]
    },
    {
      id: 8,
      name: 'Carlos Martinez',
      birthday: 'July 14, 1994',
      email: 'carlos.martinez@email.com',
      phone: '+1 555-0108',
      generation: 'Child',
      spouse: 7,
      parents: [10, 11],
      children: [12, 13]
    },
    {
      id: 9,
      name: 'Michael Wilson',
      birthday: 'November 8, 1998',
      email: 'michael.wilson@email.com',
      phone: '+1 555-0109',
      generation: 'Child',
      parents: [5, 6]
    },
    // Grandchildren
    {
      id: 12,
      name: 'Sofia Martinez',
      birthday: 'March 10, 2018',
      email: 'sofia.martinez@email.com',
      phone: '+1 555-0112',
      generation: 'Grandchild',
      parents: [7, 8]
    },
    {
      id: 13,
      name: 'Lucas Martinez',
      birthday: 'June 15, 2020',
      email: 'lucas.martinez@email.com',
      phone: '+1 555-0113',
      generation: 'Grandchild',
      parents: [7, 8]
    }
  ]

  const getMemberById = (id) => familyMembers.find(m => m.id === id)

  const getImmediateFamily = (member) => {
    const family = {
      member,
      spouse: member.spouse ? getMemberById(member.spouse) : null,
      parents: member.parents ? member.parents.map(getMemberById) : [],
      children: member.children ? member.children.map(getMemberById) : []
    }
    return family
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = familyMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleMemberClick = (member) => {
    setSelectedMember(member)
    setShowModal(true)
  }

  const MemberCard = ({ member, size = 'normal', showGeneration = false }) => (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${
      size === 'large' ? 'p-5' : 'p-3'
    }`}>
      <h3 className={`font-semibold text-gray-800 ${
        size === 'large' ? 'text-lg mb-3' : 'text-sm mb-2'
      }`}>
        {member.name}
      </h3>
      {showGeneration && (
        <p className="text-xs text-blue-600 font-medium mb-2">{member.generation}</p>
      )}
      <div className={`space-y-1 ${size === 'large' ? 'text-sm' : 'text-xs'} text-gray-600`}>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-blue-500 flex-shrink-0" />
          <span className="truncate">{member.birthday}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-blue-500 flex-shrink-0" />
          <span className="truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3 h-3 text-blue-500 flex-shrink-0" />
          <span>{member.phone}</span>
        </div>
      </div>
    </div>
  )

  const FamilyTreeModal = ({ member, onClose }) => {
    const family = getImmediateFamily(member)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-gradient-to-r from-green-400 to-blue-400 text-white p-6 rounded-t-2xl flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Immediate Family Tree</h2>
              <p className="text-blue-100 text-sm mt-1">Nuclear family of {member.name}</p>
            </div>
            <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 bg-white-a700">
            {/* Parents */}
            {family.parents.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Parents
                </h3>
                <div className="flex justify-center gap-6 items-center">
                  <div className="w-56">
                    <MemberCard member={family.parents[0]} />
                  </div>
                  {family.parents[1] && (
                    <>
                      <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                      <div className="w-56">
                        <MemberCard member={family.parents[1]} />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-center mt-4">
                  <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Selected Member and Spouse */}
            <div className="mb-8 bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {family.spouse ? 'Couple' : 'Selected Member'}
              </h3>
              <div className="flex justify-center gap-6 items-center">
                <div className="w-64">
                  <MemberCard member={family.member} size="large" showGeneration />
                </div>
                {family.spouse && (
                  <>
                    <Heart className="w-8 h-8 text-red-400 fill-red-400" />
                    <div className="w-64">
                      <MemberCard member={family.spouse} size="large" showGeneration />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Children */}
            {family.children.length > 0 && (
              <div>
                <div className="flex justify-center mb-4">
                  <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Children
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {family.children.map(child => (
                    <div key={child.id}>
                      <MemberCard member={child} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-400 to-blue-400 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Users className="w-16 h-16" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            The Pregbaha Family Heritage
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Generations of love, legacy, and connection
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <Input
                type="text"
                placeholder="Search family members by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-5 rounded-2xl text-gray-800 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {searchQuery && searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Found {searchResults.length} {searchResults.length === 1 ? 'member' : 'members'}
            </h2>
            <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(member => (
                <div
                  key={member.id}
                  onClick={() => handleMemberClick(member)}
                  className="cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-400 transition-all">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{member.generation}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{member.birthday}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span className="truncate">{member.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 px-5 rounded-b-xl text-center font-medium">
                      View Family Tree
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No members found</h3>
            <p className="text-gray-500">Try searching with a different name</p>
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-16">
            <Users className="w-20 h-20 text-blue-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              Explore Your Family Heritage
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Search for any family member to discover their immediate family tree,
              including parents, spouse, and children.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedMember && (
        <FamilyTreeModal member={selectedMember} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default FamilyHeritage
